import asyncHandler from 'express-async-handler';
import Home from '../models/Home.js';

// @desc    Get home section info
// @route   GET /api/home
// @access  Public
const getHome = asyncHandler(async (req, res) => {
  let home = await Home.findOne();

  if (!home) {
    // Seed default data if empty
    const defaultHome = {
      title: "Gurumurthy is a Data Scientist",
      subtitle: "Software Developer (MERN) | ML & Computer Vision",
      description: "Building state-of-the-art AI solutions and responsive web applications where technologies meet creativity.",
      image: "/images/Image.png",
      status: "Currently working on Portfolio"
    };
    home = await Home.create(defaultHome);
  }

  res.json(home);
});

// @desc    Update home section info
// @route   POST /api/home (or PUT)
// @access  Private/Admin
const updateHome = asyncHandler(async (req, res) => {
  let home = await Home.findOne();

  if (home) {
    home.title = req.body.title || home.title;
    home.subtitle = req.body.subtitle || home.subtitle;
    home.description = req.body.description || home.description;
    home.image = req.body.image || home.image;
    home.status = req.body.status || home.status;

    const updatedHome = await home.save();
    res.json(updatedHome);
  } else {
    // Checks if create is needed (edge case if deleted manually)
    const newHome = await Home.create(req.body);
    res.status(201).json(newHome);
  }
});

export { getHome, updateHome };
