import { check, body, validationResult } from 'express-validator';

const validateField = (check, fieldName, customErrorMessage) => (
	check(fieldName).exists().withMessage(customErrorMessage)
);

const validateBody = (body, fieldName, customErrorMessage) => (
	body(fieldName).not().isEmpty().withMessage(customErrorMessage).trim()
);

const validateInputLength = (check, fieldName, range, customErrorMessage) => (
	check(fieldName).isLength(range).withMessage(customErrorMessage)
);

const validateAlphaNumeric = (check, fieldName, customErrorMessage) => (
	check(fieldName).isAlphanumeric().withMessage(customErrorMessage)
);

const validateEmail = (check, fieldName, customErrorMessage) => (
	check(fieldName).isEmail().withMessage(customErrorMessage)
);

const checkField = (route) => {
	switch(route) {
	case 'create':
		return [
			validateField(check, 'ProductName', 'ProductName field is missing'),
			validateBody(body, 'ProductName', 'ProductName is required'),
			check('ProductName')
				.isLength({ min: 3 })
				.withMessage('Invalid ProductName')
		];
	case 'register':
		return [
			validateField(check, 'Username', 'Username field is missing'),
			validateField(check, 'Email', 'Email field is required'),
			validateField(check, 'Password', 'Password field is required'),
			validateBody(body, 'Username', 'Username is required'),
			validateBody(body, 'Email', 'Email is required'),
			validateBody(body, 'Password', 'Username is required'),
			validateInputLength(check, 'Username', {min: 3, max: 15},
				'Username should contain a minimum and maximum of 3-15 letters'),
			validateAlphaNumeric(check, 'Username', 'Should contain only numbers and letters'),
			validateEmail(check, 'Email', 'Please Provide a valid email'),
			validateInputLength(check, 'Password', {min:3, max:10},
				'Password should contain a minimum and maximum of 3-15 letters')
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
