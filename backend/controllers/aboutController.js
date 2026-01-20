import About from '../models/About.js';

// @desc    Get about info
// @route   GET /api/about
// @access  Public
// @desc    Get about info
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
    try {
        let about = await About.findOne();
        
        // Auto-seed if empty
        if (!about) {
            const defaultAbout = {
                bio: "Experienced in building and deploying end-to-end ML-driven applications using Python, TensorFlow, and Scikit-learn. Proficient in integrating ML models into real-world web systems with the MERN stack.",
                role: "Aspiring Machine Learning Engineer",
                email: "gurumurthys001@gmail.com",
                github: "https://github.com/Gurumurthys1",
                linkedin: "https://www.linkedin.com/in/gurumurthys/",
                image: "/images/Image-2.png" // Default image
            };
            about = await About.create(defaultAbout);
        }

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
