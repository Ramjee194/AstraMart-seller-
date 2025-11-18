import express from 'express'
import protect from '../middlewares/auth.middleware.js';
import { approveVendor, listVendors, platformStats } from '../controllers/admin.controller.js';
import roleMiddleware from '../middlewares/role.middleware.js';



const router =express.Router();

router.get('/vendors',protect,roleMiddleware(['admin']),listVendors);
router.get('/vendors/:id/kyc',protect,roleMiddleware(['admin']),approveVendor);
router.get('/stats',protect,roleMiddleware(['admin']),platformStats);

export default router