import uniqid from 'uniqid';
import models from '../db/models';


export const jsonResponse = (res, status, success, message, data, token) => (
	res.status(status).json({
		success,
		message,
		data,
		token
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

export default (io) => {
	io.on('connection', async socket => {
		const data = await findAllDb(models);
		socket.emit('initialList', data);
		socket.on('addProduct', async product => {
			const newProduct = await findCreateDB(models, product);
			if(newProduct[1]) {
				const [ created ] = newProduct;
				io.emit('productAdded', created.get({plain: true}));
				socket.emit('productAddedSuccess', 'Successfully added');
			}
			else {
				io.emit('productAdded', {conflictMessage: 'Product already exists'});
			}
		});
		// Listen to update product action from client
		socket.on('updateProduct', async productData => {
			const { productId, ProductName } = productData;
			const product = await models.Product.update(
				{ProductName: ProductName},
				{
					where: {ProductId: productId},
					returning: true,
					plain: true,
					raw: true,
				},

			);
			const data = await findAllDb(models);
			const updatedData = {products: data, product: product[1]};
			io.emit('updatedProduct', updatedData);
		});
		// listen to delete product action from client
		socket.on('deleteProduct', async productId => {
			const product = await findItemDb(models, productId);
			if(product){
				await models.Product.destroy({
					where: {
						ProductId: productId
					}
				});
				const data = await findAllDb(models);
				io.emit('initialList', data);
			}
		});
	});
};


