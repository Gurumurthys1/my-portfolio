import express from 'express';
const router = express.Router();
import {
    getHackathons,
    createHackathon,
    updateHackathon,
    deleteHackathon,
} from '../controllers/hackathonController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getHackathons).post(protect, createHackathon);
router.route('/:id').put(protect, updateHackathon).delete(protect, deleteHackathon);

export default router;
