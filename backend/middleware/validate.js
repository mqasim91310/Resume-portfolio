const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Runs after express-validator check(...) middlewares to collect and
// throw a single, consistent validation error.
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => `${e.path}: ${e.msg}`);
        return next(new ApiError(400, 'Validation failed', messages));
    }
    next();
};

module.exports = validate;
