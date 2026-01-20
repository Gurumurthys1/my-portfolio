import express from 'express';
import { getSections, updateSection, seedSections } from '../controllers/sectionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSections);
router.route('/seed').post(protect, admin, seedSections);
router.route('/:id').put(protect, admin, updateSection);

export default router;
