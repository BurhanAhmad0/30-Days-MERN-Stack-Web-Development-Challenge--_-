// middleware/validateProduct.js
const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description must length is must be not empty'),

    // Final middleware to check the results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateProduct;
