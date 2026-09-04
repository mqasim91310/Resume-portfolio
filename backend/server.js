require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

// Route modules
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const certificatesRoutes = require('./routes/certificatesRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// --- Security & core middleware -------------------------------------------------
app.use(helmet());
// NOTE: browsers reject `Access-Control-Allow-Origin: *` when credentials are
// involved, so we must never fall back to '*' here. If CLIENT_URL isn't set,
// default to the local dev origin and warn loudly instead of silently
// breaking CORS in production.
if (!process.env.CLIENT_URL) {
    logger.warn('CLIENT_URL is not set — defaulting CORS origin to http://localhost:5173. Set CLIENT_URL in your .env before deploying.');
}

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);
// File uploads go through multer (separate size limits per type in
// middleware/upload.js) — this parser only ever needs to handle small JSON
// text payloads, so keep its limit tight to reduce DoS surface.
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Log every request (in production, morgan pipes into winston via a stream)
app.use(
    morgan('combined', {
        stream: { write: (message) => logger.info(message.trim()) },
    })
);

// Apply a general rate limit to every /api route
app.use('/api', apiLimiter);

// Serve uploaded files statically.
// helmet() above sets Cross-Origin-Resource-Policy: same-origin globally,
// which is the right default for the JSON API — but the frontend lives on a
// different origin in production (see resolveBackendAsset.js) and embeds
// these files directly via <img src="https://api-origin/uploads/...">.
// Browsers enforce CORP independently of CORS, so without this override
// every uploaded profile photo, project screenshot, and certificate image
// would silently fail to load cross-origin. This does not weaken CORS
// (still origin-restricted with credentials above) or the CSP on API
// responses — it only relaxes resource embedding for this one static route.
app.use(
    '/uploads',
    helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }),
    express.static(path.join(__dirname, 'uploads'))
);

// --- Routes -----------------------------------------------------------------
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is healthy', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/contact', contactRoutes);

// --- Error handling (must be last) -------------------------------------------
app.use(notFound);
app.use(errorHandler);

// --- Start server -------------------------------------------------------------
const PORT = process.env.PORT || 5000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
};

start();

// Guard against unhandled rejections crashing the process silently
process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
});

module.exports = app;
