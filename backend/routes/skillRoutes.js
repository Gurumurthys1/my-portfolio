import express from 'express';
import {
  getAllSkills,
  getSkillsByCategory,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

router.route('/')
  .get(getAllSkills)
  .post(createSkill);

router.get('/category/:category', getSkillsByCategory);

router.route('/:id')
  .put(updateSkill)
  .delete(deleteSkill);

export default router;
