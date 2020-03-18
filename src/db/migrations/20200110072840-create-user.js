'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					isAlpha: true,
					min: 3,
					max: 10,
					is: /^[a-z]$([0,9])?/,
				}
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				  isEmail: true,
				}
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					// eslint-disable-next-line no-mixed-spaces-and-tabs
				  is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,})/
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('Users');
	}
};
