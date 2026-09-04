const asyncHandler = require('express-async-handler');
const About = require('../models/About');

// Only these fields may be set via the public update endpoint — prevents a
// caller from injecting arbitrary/unexpected keys into the document via
// Object.assign(doc, req.body).
const ALLOWED_FIELDS = [
    'name',
    'designation',
    'biography',
    'careerObjective',
    'currentFocus',
    'futureGoals',
    'interests',
    'socialLinks',
];

const pick = (body, fields) =>
    fields.reduce((acc, key) => {
        if (body[key] !== undefined) acc[key] = body[key];
        return acc;
    }, {});

// @desc    Get About info (creates a default doc on first request)
// @route   GET /api/about
// @access  Public
const getAbout = asyncHandler(async (req, res) => {
    let about = await About.findOne();
    if (!about) {
        about = await About.create({});
    }
    res.status(200).json({ success: true, data: about });
});

// @desc    Update About info
// @route   PUT /api/about
// @access  Private
const updateAbout = asyncHandler(async (req, res) => {
    let about = await About.findOne();
    const updates = pick(req.body, ALLOWED_FIELDS);
    if (!about) {
        about = await About.create(updates);
    } else {
        Object.assign(about, updates);
        if (req.file) {
            about.profileImage = `/uploads/profile/${req.file.filename}`;
        }
        await about.save();
    }
    res.status(200).json({ success: true, message: 'About section updated', data: about });
});

// @desc    Upload/replace resume PDF
// @route   PUT /api/about/resume
// @access  Private
const updateResume = asyncHandler(async (req, res) => {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    if (req.file) {
        about.resumeFile = `/uploads/resume/${req.file.filename}`;
        await about.save();
    }

    res.status(200).json({ success: true, message: 'Resume updated', data: about });
});

module.exports = { getAbout, updateAbout, updateResume };
