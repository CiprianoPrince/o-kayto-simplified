const { body } = require('express-validator');

exports.validateName = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Color name is required')
        .isAlpha()
        .withMessage('Color name must contain only letters')
        .isLength({ min: 1 })
        .withMessage('Color name must be at least 3 characters long')
        .escape(),
];
