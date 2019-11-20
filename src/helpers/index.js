
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

