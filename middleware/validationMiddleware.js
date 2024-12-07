// middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Validation rules for creating a user
const validateUserCreation = [
    body('firstName').notEmpty().withMessage('First name is required.'),
    body('lastName').notEmpty().withMessage('Last name is required.'),
    body('username').notEmpty().withMessage('Username is required.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('email').isEmail().withMessage('Email is not valid.'),
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

// Validation rules for updating a user
const validateUserUpdate = [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty.'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty.'),
    body('username').optional().notEmpty().withMessage('Username cannot be empty.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('email').optional().isEmail().withMessage('Email is not valid.'),
];

// Middleware to check for validation errors
const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed if no validation errors
};

module.exports = { validateUserCreation, validateUserUpdate, checkValidationErrors };