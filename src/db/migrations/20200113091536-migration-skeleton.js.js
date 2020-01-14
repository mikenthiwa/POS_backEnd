'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					'Products',
					'userId',
					{
						type: Sequelize.STRING,
						references: {
							model: {
								tableName: 'Users',
								schema: 'public'
							},
							key: 'userId',
						},
						allowNull: false,
					},
					{transaction: t}
				)
			]);
		});
	},
	down: (queryInterface) => {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.removeColumn(
					'Products',
					'userId',
					{ transaction: t }
				)
			]);
		});
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	}
};
