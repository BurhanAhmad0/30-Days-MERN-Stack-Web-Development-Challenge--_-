// middleware/validateProduct.js
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('StreetAddress').notEmpty().withMessage('Street Address is required'),
    body('Apartment'),
    body('PostCode').notEmpty().withMessage('Post Code is required'),

    // Final middleware to check the results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
