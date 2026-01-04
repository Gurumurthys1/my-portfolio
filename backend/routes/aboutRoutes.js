import express from 'express';
const router = express.Router();
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getAbout).post(protect, updateAbout);

export default router;
