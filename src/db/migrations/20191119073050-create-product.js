'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			ProductId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ProductName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('Products');
	}
};
