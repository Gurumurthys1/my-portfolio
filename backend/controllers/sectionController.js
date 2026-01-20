import asyncHandler from 'express-async-handler';
import SectionControl from '../models/SectionControl.js';

// @desc    Get all sections
// @route   GET /api/sections
// @access  Public
const getSections = asyncHandler(async (req, res) => {
  // Check for existence of each default section and add if missing
  const defaultSections = [
    { name: 'home', label: 'Home', isVisible: true, order: 10 },
    { name: 'projects', label: 'Works', isVisible: true, order: 20 },
    { name: 'skills', label: 'Skills', isVisible: true, order: 30 },
    { name: 'experience', label: 'Experience', isVisible: true, order: 40 },
    { name: 'certifications', label: 'Certifications', isVisible: true, order: 50 },
    { name: 'hackathons', label: 'Hackathons', isVisible: true, order: 60 },
    { name: 'about', label: 'About Me', isVisible: true, order: 70 },
    { name: 'contact', label: 'Contact', isVisible: true, order: 80 },
  ];

  for (const section of defaultSections) {
      const exists = await SectionControl.findOne({ name: section.name });
      if (!exists) {
          await SectionControl.create(section);
      }
  }
  
  // Return sorted by order
  const sections = await SectionControl.find({}).sort({ order: 1 });
  res.json(sections);
});

// @desc    Update section visibility, label, and order
// @route   PUT /api/sections/:id
// @access  Private/Admin
const updateSection = asyncHandler(async (req, res) => {
  const section = await SectionControl.findById(req.params.id);

  if (section) {
    section.isVisible = req.body.isVisible !== undefined ? req.body.isVisible : section.isVisible;
    section.label = req.body.label || section.label;
    section.order = req.body.order !== undefined ? req.body.order : section.order;
    
    const updatedSection = await section.save();
    res.json(updatedSection);
  } else {
    res.status(404);
    throw new Error('Section not found');
  }
});

// @desc    Seed initial sections if empty
// @route   POST /api/sections/seed
// @access  Private/Admin
const seedSections = asyncHandler(async (req, res) => {
  // Same logic as getSections for redundancy or manual trigger
  const defaultSections = [
    { name: 'home', label: 'Home', isVisible: true, order: 10 },
    { name: 'projects', label: 'Works', isVisible: true, order: 20 },
    { name: 'skills', label: 'Skills', isVisible: true, order: 30 },
    { name: 'experience', label: 'Experience', isVisible: true, order: 40 },
    { name: 'certifications', label: 'Certifications', isVisible: true, order: 50 },
    { name: 'hackathons', label: 'Hackathons', isVisible: true, order: 60 },
    { name: 'about', label: 'About Me', isVisible: true, order: 70 },
    { name: 'contact', label: 'Contact', isVisible: true, order: 80 },
  ];

  let addedCount = 0;
  for (const section of defaultSections) {
      const exists = await SectionControl.findOne({ name: section.name });
      if (!exists) {
          await SectionControl.create(section);
          addedCount++;
      }
  }

  if (addedCount > 0) {
    res.json({ message: `Seeded ${addedCount} missing sections` });
  } else {
    res.json({ message: 'All sections already exist' });
  }
});

export { getSections, updateSection, seedSections };
