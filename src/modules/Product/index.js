import express from 'express';
import { Products } from './productController';
import { validateInput } from '../validator';

const router = express.Router();

router.post(
	'/create',
	validateInput('create'),
	Products.addProduct
);

router.get(
	'/products',
	Products.getProducts,
);

router.get(
	'/products/:productId/',
	Products.getSingleProduct,
);

router.put(
	'/products/:productId',
	validateInput('create'),
	Products.updateProduct,
);

router.delete(
	'/products/:productId',
	Products.deleteProduct
);

export default router;
