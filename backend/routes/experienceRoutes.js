import express from 'express';
const router = express.Router();
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getExperiences).post(protect, createExperience);
router.route('/:id').put(protect, updateExperience).delete(protect, deleteExperience);

export default router;
