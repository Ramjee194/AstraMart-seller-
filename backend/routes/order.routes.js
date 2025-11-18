import express from 'express'
import protect from '../middlewares/auth.middleware.js'
import { createOrder, updateOrderStatus, webhookHandler } from '../controllers/order.controller.js';


const router = express.Router();

router.post('/',protect,createOrder);
router.post('/webhook',express.raw({type:'application/json'}),webhookHandler);
router.put('/:id/status',protect,updateOrderStatus);

export default router;