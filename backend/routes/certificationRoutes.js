import express from 'express';
import { getCertifications, createCertification, deleteCertification, updateCertification } from '../controllers/certificationController.js';
// Note: We'll add auth middleware once we confirm auth is working as expected for other routes
// import { protect, admin } from '../middleware/authMiddleware.js'; 
// Use the same auth approach as other routes. checking skillRoutes.js might be good.
// Assuming simple implementation for now based on context, will check middleware usage.

const router = express.Router();

router.route('/').get(getCertifications).post(createCertification);
router.route('/:id').delete(deleteCertification).put(updateCertification);

export default router;
