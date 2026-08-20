const asyncHandler = require('express-async-handler');
const ContactMessage = require('../models/ContactMessage');
const ApiError = require('../utils/ApiError');
const { sendContactNotification } = require('../services/emailService');
const logger = require('../utils/logger');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const submitMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    const saved = await ContactMessage.create({ name, email, subject, message });

    const emailSent = await sendContactNotification({ name, email, subject, message });
    if (!emailSent) {
        logger.warn(`Contact message ${saved._id} saved, but admin email notification failed`);
    }

    res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully. Thank you for reaching out!',
        data: { id: saved._id },
    });
});

// @desc    Get all contact messages (newest first)
// @route   GET /api/contact
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
});

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) throw new ApiError(404, 'Message not found');
    res.status(200).json({ success: true, message: 'Marked as read', data: msg });
});

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) throw new ApiError(404, 'Message not found');
    res.status(200).json({ success: true, message: 'Message deleted' });
});

module.exports = { submitMessage, getMessages, markAsRead, deleteMessage };
