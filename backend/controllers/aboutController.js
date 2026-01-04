import About from '../models/About.js';

// @desc    Get about info
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
    try {
        // Return the first about document found
        const about = await About.findOne();
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create or Update about info
// @route   POST /api/about
// @access  Private
const updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        if (about) {
            // Update existing
            about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
        } else {
            // Create new
            about = await About.create(req.body);
        }

        res.status(200).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getAbout,
    updateAbout,
};
