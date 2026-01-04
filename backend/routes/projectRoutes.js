import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/')
  .get(getAllProjects)
  .post(createProject);

router.get('/featured', getFeaturedProjects);

router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
