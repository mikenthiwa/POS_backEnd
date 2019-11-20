import dotenv from 'dotenv';
dotenv.config();

export default {
	PORT: process.env.PORT,
	database: {
		dbUsername: process.env.DB_USERNAME,
		dbPassword: process.env.DB_PASSWORD,
		developmentDbName: process.env.DEVELOPMENT_DB_NAME,
		testDbName: process.env.TEST_DB_NAME,
		productionDbName: process.env.PRODUCTION_DB_NAME
	}
};
