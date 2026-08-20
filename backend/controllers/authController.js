const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const logger = require('../utils/logger');

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.matchPassword(password))) {
        logger.warn(`Failed login attempt for email: ${email}`);
        throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    logger.info(`Admin login: ${admin.email}`);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                profileImage: admin.profileImage,
            },
            accessToken,
            refreshToken,
        },
    });
});

// @desc    Admin logout (client discards token; stateless JWT)
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, data: req.admin });
});

// @desc    Exchange a refresh token for a new access token
// @route   POST /api/auth/refresh
// @access  Public
const refresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new ApiError(400, 'Refresh token is required');

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) throw new ApiError(401, 'Admin not found');

        const accessToken = generateAccessToken(admin._id);
        res.status(200).json({ success: true, data: { accessToken } });
    } catch {
        throw new ApiError(401, 'Invalid or expired refresh token');
    }
});

module.exports = { login, logout, getProfile, refresh };
