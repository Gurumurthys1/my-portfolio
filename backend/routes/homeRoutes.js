import express from 'express';
import { getHome, updateHome } from '../controllers/homeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHome).post(protect, admin, updateHome);

export default router;
