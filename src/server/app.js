import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';

export default () => {
	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors());
	app.use('/api/v1', routes());
	app.use('*', (req, res) => {
		return res.status(400).json({
			success: false,
			message: 'Not found'
		});
	});

	return app;
};
