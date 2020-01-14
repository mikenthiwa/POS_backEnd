'use strict';
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		// eslint-disable-next-line no-mixed-spaces-and-tabs
	    ProductId: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	        type: DataTypes.STRING,
			allowNull: false,
		},
		ProductName: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
		    type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	    	type: DataTypes.STRING,
			references: {
				model: {
					tableName: 'Users',
					schema: 'public'
				},
				key: 'userId',
			},
			allowNull: false,
		}
	}, {});
	Product.associate = function() {
		// associations can be defined here
	};
	return Product;
};
