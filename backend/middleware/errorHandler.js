const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

// 404 handler for unmatched routes
const notFound = (req, res, next) => {
    const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
    next(error);
};

// Centralized error handler — every thrown error ends up here with a
// consistent { success, message, errors } JSON shape.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || [];

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
        errors = Object.values(err.errors).map((e) => e.message);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0];
        message = `Duplicate value for field: ${field}`;
    }

    // Multer file errors
    if (err.name === 'MulterError') {
        statusCode = 400;
        message = err.message;
    }

    if (statusCode >= 500) {
        logger.error(`${req.method} ${req.originalUrl} -> ${err.stack || err.message}`);
    } else {
        logger.warn(`${req.method} ${req.originalUrl} -> ${statusCode} ${message}`);
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = { notFound, errorHandler };
