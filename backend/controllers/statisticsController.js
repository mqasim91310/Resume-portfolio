const asyncHandler = require('express-async-handler');
const Statistics = require('../models/Statistics');

// @desc    Get statistics (creates a default doc on first request)
// @route   GET /api/statistics
// @access  Public
const getStatistics = asyncHandler(async (req, res) => {
    let stats = await Statistics.findOne();
    if (!stats) stats = await Statistics.create({});
    res.status(200).json({ success: true, data: stats });
});

// @desc    Update statistics
// @route   PUT /api/statistics
// @access  Private
const updateStatistics = asyncHandler(async (req, res) => {
    let stats = await Statistics.findOne();
    if (!stats) {
        stats = await Statistics.create(req.body);
    } else {
        Object.assign(stats, req.body);
        await stats.save();
    }
    res.status(200).json({ success: true, message: 'Statistics updated', data: stats });
});

module.exports = { getStatistics, updateStatistics };
