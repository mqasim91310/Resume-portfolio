const express = require('express');
const { body } = require('express-validator');
const { login, logout, getProfile, refresh } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post(
    '/login',
    authLimiter,
    [
        body('email').isEmail().withMessage('A valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validate,
    login
);

router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.post('/refresh', refresh);

module.exports = router;
