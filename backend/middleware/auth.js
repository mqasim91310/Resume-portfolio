const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');

// Verifies the JWT and attaches req.admin
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ApiError(401, 'Not authorized, no token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);

        if (!req.admin) {
            throw new ApiError(401, 'Not authorized, admin not found');
        }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Session expired, please log in again');
        }
        throw new ApiError(401, 'Not authorized, token invalid');
    }
});

// Restricts a route to specific roles, e.g. authorize('superadmin')
const authorize = (...roles) => (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
        throw new ApiError(403, 'You do not have permission to perform this action');
    }
    next();
};

module.exports = { protect, authorize };
