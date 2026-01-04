import asyncHandler from 'express-async-handler';
import Hackathon from '../models/Hackathon.js';

// @desc    Get all hackathons
// @route   GET /api/hackathons
// @access  Public
const getHackathons = asyncHandler(async (req, res) => {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(hackathons);
});

// @desc    Create new hackathon
// @route   POST /api/hackathons
// @access  Private (Admin)
const createHackathon = asyncHandler(async (req, res) => {
    const { name, type, image, prize, description, location } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Please add a hackathon name');
    }

    const hackathon = await Hackathon.create({
        name,
        type: type || 'participation',
        image,
        prize,
        description,
        location
    });

    res.status(201).json(hackathon);
});

// @desc    Update hackathon
// @route   PUT /api/hackathons/:id
// @access  Private (Admin)
const updateHackathon = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
        res.status(404);
        throw new Error('Hackathon entry not found');
    }

    const updatedHackathon = await Hackathon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedHackathon);
});

// @desc    Delete hackathon
// @route   DELETE /api/hackathons/:id
// @access  Private (Admin)
const deleteHackathon = asyncHandler(async (req, res) => {
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
        res.status(404);
        throw new Error('Hackathon entry not found');
    }

    await hackathon.deleteOne();

    res.status(200).json({ id: req.params.id });
});

export {
    getHackathons,
    createHackathon,
    updateHackathon,
    deleteHackathon,
};
