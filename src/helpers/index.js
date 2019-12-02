import uniqid from 'uniqid';


export const jsonResponse = (res, status, success, message, data) => (
	res.status(status).json({
		success,
		message,
		data,
	})
);

export const findItemDb = (models, productId) => (
	models.Product.findOne({raw: true, where: {ProductId: productId}})
);

export const findAllDb = (model) => (
	model.Product.findAll({raw: true})
);

export const findCreateDB = (model, Product) => {
	const { ProductName } = Product;
	const ProductId = uniqid();
	return model.Product.findOrCreate({
		where: { ProductName },
		defaults: {ProductId},
	});
};


