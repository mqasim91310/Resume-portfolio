# Portfolio Backend (MERN)

Production-style Node.js/Express/MongoDB backend for Muhammad Qasim's portfolio.
It exposes a REST API that the existing React frontend (and a small built-in
admin panel at `/admin`) uses to read and manage all site content.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication (access + refresh tokens), bcrypt password hashing
- Multer (file uploads), Nodemailer (contact form email notifications)
- Helmet, CORS, express-rate-limit, express-mongo-sanitize, express-validator
- Winston (logging to `logs/`), Morgan (HTTP request logging)

## Folder Structure

```
backend/
  config/          MongoDB connection
  controllers/     Route handler logic per resource
  middleware/      auth, error handling, uploads, validation, rate limiting
  models/          Mongoose schemas
  routes/          Express routers per resource
  services/        emailService (Nodemailer)
  utils/           logger, ApiError, JWT helpers, generic CRUD controller/route factories
  uploads/          Uploaded files (profile/projects/certificates/resume)
  logs/            Winston log files
  seed/seed.js     Populates MongoDB with the portfolio's real content
  server.js        App entry point
  .env.example     Environment variable template
```

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in `MONGODB_URI` (a local MongoDB instance or a MongoDB Atlas connection
   string), `JWT_SECRET` / `JWT_REFRESH_SECRET` (any long random strings), and
   the `EMAIL_*` values if you want contact-form email notifications (a Gmail
   [app password](https://support.google.com/accounts/answer/185833) works well
   for `EMAIL_HOST=smtp.gmail.com`, `EMAIL_PORT=587`).

3. **Seed the database** (creates the admin account + populates real content)
   ```bash
   npm run seed
   ```
   This creates:
   - An admin account using `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from `.env`
   - The About section, 23 skills, education, the Decode Labs experience entry,
     all 17 projects (15 completed + 2 upcoming), all 10 certificates, 8
     services, and statistics — matching what's on the live site today.

   To wipe all collections: `npm run seed:destroy`

4. **Run the server**
   ```bash
   npm run dev     # nodemon, auto-restarts on file changes
   # or
   npm start       # plain node
   ```
   The API runs on `http://localhost:5000` by default (`PORT` in `.env`).

5. **Health check**: `GET http://localhost:5000/api/health`

## API Reference

All responses follow `{ success, message?, data?, count?, errors? }`.
Protected routes require `Authorization: Bearer <accessToken>`.

### Auth
| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Private |
| GET  | `/api/auth/profile` | Private |
| POST | `/api/auth/refresh` | Public (needs refreshToken in body) |

### About (singleton)
| Method | Route | Access |
|---|---|---|
| GET | `/api/about` | Public |
| PUT | `/api/about` | Private (multipart, field `profileImage`) |
| PUT | `/api/about/resume` | Private (multipart, field `resume`) |

### Skills / Education / Experience / Services (identical CRUD shape)
| Method | Route |
|---|---|
| GET | `/api/skills`, `/api/education`, `/api/experience`, `/api/services` |
| GET | `.../:id` |
| POST | `.../` (Private) |
| PUT | `.../:id` (Private) |
| DELETE | `.../:id` (Private) |

### Projects
| Method | Route | Notes |
|---|---|---|
| GET | `/api/projects` | Query: `?category=`, `?semester=`, `?featured=true`, `?status=` |
| GET | `/api/projects/:id` | |
| POST | `/api/projects` | Private, multipart, field `images` (up to 6) |
| PUT | `/api/projects/:id` | Private, multipart |
| DELETE | `/api/projects/:id` | Private — also deletes uploaded image files |

### Certificates
| Method | Route |
|---|---|
| GET | `/api/certificates` |
| GET | `/api/certificates/:id` |
| POST | `/api/certificates` (Private, multipart field `certificateImage`) |
| PUT | `/api/certificates/:id` (Private) |
| DELETE | `/api/certificates/:id` (Private) |

### Statistics (singleton)
| Method | Route |
|---|---|
| GET | `/api/statistics` |
| PUT | `/api/statistics` (Private) |

### Contact
| Method | Route | Notes |
|---|---|---|
| POST | `/api/contact` | Public, rate-limited (5/hour). Saves to DB + emails admin. |
| GET | `/api/contact` | Private |
| PUT | `/api/contact/:id/read` | Private |
| DELETE | `/api/contact/:id` | Private |

## Security

- **Helmet** sets protective HTTP headers.
- **CORS** restricted to `CLIENT_URL`.
- **express-rate-limit**: 300 req/15min globally, 10 login attempts/15min,
  5 contact submissions/hour.
- **express-mongo-sanitize** strips `$`/`.` operators from user input to
  prevent NoSQL injection.
- **express-validator** validates every write endpoint's input.
- Passwords hashed with **bcrypt** (10 salt rounds); JWTs signed with
  configurable expiry and a separate refresh-token secret.
- Multer restricts uploads by MIME type (`jpeg/png/webp` for images, `pdf`
  for the resume) and file size (5MB images, 10MB resume).

## Logging

Winston logs to both the console and `logs/combined.log` /
`logs/error.log`. Morgan pipes every HTTP request through the same logger.

## Deployment Notes

- Set `NODE_ENV=production` and a real `MONGODB_URI` (e.g. MongoDB Atlas).
- Point `CLIENT_URL` at your deployed frontend's origin.
- Uploaded files are stored on local disk under `uploads/` — on platforms
  with ephemeral filesystems (Render, Railway, Vercel serverless, etc.)
  swap this for S3/Cloudinary in `middleware/upload.js` and the relevant
  controllers before going to production.
- Put the app behind a process manager (PM2) or your platform's equivalent.
