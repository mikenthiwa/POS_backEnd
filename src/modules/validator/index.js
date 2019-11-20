import { check, body, validationResult } from 'express-validator';

const checkField = (route) => {
	if(route === 'create') {
		return [
			check('ProductName')
				.exists()
				.withMessage('Field ProductName is missing'),
			body('ProductName')
				.not()
				.isEmpty()
				.withMessage('ProductName cannot be empty')
				.trim(),
			check('ProductName')
				.isLength({ min: 3 })
				.withMessage('Invalid ProductName')
		];
	}
};

export const validateInput = (route) => {
	return [
		checkField(route),
		(req, res, next) => {
			// Finds the validation errors in this request and wraps them in an object with handy functions
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({errors: errors.array()});
			}
			next();
		}
	];
};
