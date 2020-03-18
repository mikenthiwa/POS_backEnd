import models from '../../db/models';
import { jsonResponse, findItemDb } from '../../helpers';
import uniqid from 'uniqid';
import { io } from '../../server';


export class Products {
	static async addProduct (req, res){
		const {body: { ProductName }} = req;
		try {
			const ProductId = uniqid();
			const newProduct = await models.Product.findOrCreate({
				where: { ProductName },
				defaults: {ProductId, ProductName},
			});
			if(newProduct[1]) {
				const [ created ] = newProduct;
				io.on('connection', socket => {
					socket.emit('productAdded', created.get({plain: true}));
				});
				return jsonResponse(
					res, 201, true,
					'Successfully added'
				);
			}
			return jsonResponse(
				res, 409, false,
				'The Product already exists');
		}catch (e) {
			return jsonResponse(
				res, 500, false,
				'Something went wrong');
		}
	}
	static async getProducts(req, res){
		try {
			const data = await models.Product.findAll({raw: true});
			return jsonResponse(res,
				200, true,
				'Fetched Successfully', data);
		}catch (e) {
			return jsonResponse(
				res, 500, false,
				'Something went wrong!');
		}
	}
	static async getSingleProduct(req, res){
		try {
			const {params: { productId }} = req;
			const data = await models.Product.findOne({raw: true, where: {ProductId: productId}});
			jsonResponse(
				res, 200, true,
				'Fetched Successfully', data
			);
		}catch (e) {
			jsonResponse(
				res, 500, false,
				'Something went wrong');
		}
	}
	static async updateProduct(req, res) {
		const { body: { ProductName }, params: { productId } } = req;
		try {
			const data = await findItemDb(models, productId);
			if(data) {
				await models.Product.update(
					{ProductName: ProductName},
					{
						where: {
							ProductId: productId
						}
					},
					{raw: true}
				);
				return jsonResponse(res, 200, true, 'Update Success');
			}
			return jsonResponse(res, 400, false, 'Product does not exist');

		}catch (e) {
			return jsonResponse(res, 500, false, 'Something Went wrong');
		}
	}
	static async deleteProduct(req, res) {
		const { params: { productId } } = req;
		try{
			const data = await findItemDb(models, productId);
			if(data){
				await models.Product.destroy({
					where: {
						ProductId: productId
					}
				});
				return jsonResponse(res, 200, true, 'Deleted Successfully');
			}
			return jsonResponse(res, 400, false, 'Product does not exist');
		}catch (e) {
			return jsonResponse(res, 500, false, 'Something Went wrong');
		}
	}
}
