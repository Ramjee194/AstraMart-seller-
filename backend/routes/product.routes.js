import express from 'express';
import roleMiddleware from '../middlewares/role.middleware.js';
import { createProduct, updateProduct, listProducts, getProduct } from '../controllers/product.controller.js';
import protect from '../middlewares/auth.middleware.js';
import { upload } from '../utils/s3.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, roleMiddleware(['vendor']), upload.array('images', 5), createProduct);
router.put('/:id', protect, roleMiddleware(['vendor']), upload.array('images', 5), updateProduct);

export default router;
