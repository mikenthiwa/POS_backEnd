import jwt from 'jsonwebtoken';
import env from '../environments';
import {jsonResponse} from '../helpers';

const { secretKey } = env;

export const isAuthenticated = (req, res, next) => {
	try {
		const { headers: { authorization }} = req;
		if(!authorization){
			return jsonResponse(res, 401, false,'Please provide a token');
		}
		const token = authorization.split(' ');
		jwt.verify(token[1], secretKey);
		next();
	}catch (error) {
		return jsonResponse(res, 401, false, 'Authentication failed');
	}
};
