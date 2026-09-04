const express = require('express');
const { body } = require('express-validator');
const {
    submitMessage, getMessages, markAsRead, deleteMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { contactLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const contactValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name is too long'),
    body('email').isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('subject').optional({ checkFalsy: true }).trim().isLength({ max: 200 }).withMessage('Subject is too long'),
    body('message').trim().isLength({ min: 5, max: 5000 }).withMessage('Message must be between 5 and 5000 characters'),
];

router.post('/', contactLimiter, contactValidation, validate, submitMessage);
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
