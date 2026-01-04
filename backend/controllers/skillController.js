import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get skills by category
// @route   GET /api/skills/category/:category
export const getSkillsByCategory = async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a skill
// @route   POST /api/skills
export const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      Object.assign(skill, req.body);
      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.deleteOne();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
