import http from 'http';
import app from './app';
import env from '../environments';
import Io from 'socket.io';
import models from '../db/models';
import { findAllDb, findCreateDB, findItemDb } from '../helpers';

const server = http.createServer(app());

const port = env.PORT;
export const io = Io(server);

io.on('connection', async (socket) => {
	const data = await findAllDb(models);
	socket.emit('initialList', data);
	socket.on('addProduct', async product => {
		const newProduct = await findCreateDB(models, product);
		if(newProduct[1]) {
			const [ created ] = newProduct;
			io.emit('productAdded', created.get({plain: true}));
		}
		else {
			io.emit('productAdded', {conflictMessage: 'Product already exists'});
		}
	});
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

server.listen(port, () => console.log(`Port ${port} is running`));

