import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

import os from 'os';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Use system temp directory for serverless compatibility (Vercel/AWS Lambda)
    cb(null, os.tmpdir());
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Simplified & Robust Upload Configuration
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio_certs',
        resource_type: 'auto', // Auto-detect correct type (Image vs PDF)
        timeout: 120000, // Increase timeout to 120 seconds for large files
    });
    
    // Remove local file
    if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error); // Log actual error
    // Clean up file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Detailed Server Error', error: error.message });
  }
});

export default router;
