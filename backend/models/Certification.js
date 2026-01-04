import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String, // Keeping as String to allow flexible formats like "Dec 2025"
    required: true
  },
  credentialId: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true // Required so we can show the certificate
  },
  skills: [{
    type: String
  }]
}, {
  timestamps: true
});

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
