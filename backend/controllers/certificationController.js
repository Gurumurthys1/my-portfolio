import Certification from '../models/Certification.js';

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = async (req, res) => {
  try {
    // Sort by createdAt: 1 to preserve insertion order (Newest -> Oldest as defined in seed file)
    const certifications = await Certification.find({}).sort({ createdAt: 1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new certification
// @route   POST /api/certifications
// @access  Private/Admin
export const createCertification = async (req, res) => {
  try {
    const { title, issuer, date, credentialId, imageUrl, skills } = req.body;

    const certification = new Certification({
      title,
      issuer,
      date,
      credentialId,
      imageUrl,
      skills
    });

    const createdCertification = await certification.save();
    res.status(201).json(createdCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
export const updateCertification = async (req, res) => {
  try {
    const { title, issuer, date, credentialId, imageUrl, skills } = req.body;

    const certification = await Certification.findById(req.params.id);

    if (certification) {
      certification.title = title || certification.title;
      certification.issuer = issuer || certification.issuer;
      certification.date = date || certification.date;
      certification.credentialId = credentialId || certification.credentialId;
      certification.imageUrl = imageUrl || certification.imageUrl;
      certification.skills = skills || certification.skills;

      const updatedCertification = await certification.save();
      res.json(updatedCertification);
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (certification) {
      await certification.deleteOne();
      res.json({ message: 'Certification removed' });
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
