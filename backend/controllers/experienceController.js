import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(200).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(experience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            res.status(404).json({ message: 'Experience not found' });
            return;
        }

        await experience.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
};
