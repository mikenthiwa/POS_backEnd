import express from 'express';
import { Products } from './productController';
import { validateInput } from '../validator';
import { isAuthenticated } from '../../middlware/checkAuth';

const router = express.Router();

router.post(
	'/create',
	isAuthenticated,
	validateInput('create'),
	Products.addProduct
);

router.get(
	'/yourstore/products*',
	isAuthenticated,
	Products.getProducts,
);

router.get(
	'/yourstore/products/:productId/',
	isAuthenticated,
	Products.getSingleProduct,
);

router.put(
	'/yourstore/products/:productId',
	isAuthenticated,
	validateInput('create'),
	Products.updateProduct,
);

router.delete(
	'/products/:productId',
	Products.deleteProduct
);

export default router;
