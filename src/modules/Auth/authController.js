import model from '../../db/models';
import jwt from 'jsonwebtoken';
import env from '../../environments';
import { jsonResponse } from '../../helpers';

export class Authentication {
	static async createAccount (req, res) {
		const { body: { Username, Email, Password } } = req;
		try {
			const newUser = await model.User.findOrCreate({
				where: { email: Email },
				defaults: {
					username: Username,
					email: Email,
					password: Password
				}
			});
			if(newUser[1]) {
				const { secretKey } = env;
				const token = jwt.sign({username: Username}, secretKey);
				return jsonResponse(res, 201, true, 'User created successfully', null, token);
			}
			jsonResponse(res, 409, false, 'User with that email already exist');
		}catch (e) {
			return jsonResponse(res, 500, false, 'Something went wrong');
		}
	}
}
