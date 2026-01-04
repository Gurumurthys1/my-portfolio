import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hackathons', hackathonRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running...' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
