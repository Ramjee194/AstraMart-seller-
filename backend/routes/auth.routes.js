import express from 'express'
import { register,login,profile } from '../controllers/auth.controller.js'
import protect from '../middlewares/auth.middleware.js'

const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,profile);

export default router;