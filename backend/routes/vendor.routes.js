import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import {upload} from '../utils/s3.js';
import {getMyVendorProfile,submitKyc,vendorDashboard} from '../controllers/vendor.controller.js';
import { get } from 'mongoose';

const router =express.Router();

router.get('/me',protect,role(['vendor']),getMyVendorProfile);
router.post('/kyc',protect,role(['vendor']),upload.array('documents',5),submitKyc);
router.get('/dashboard',protect,role(['vendor']),vendorDashboard);

export default router;
