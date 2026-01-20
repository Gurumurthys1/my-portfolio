import mongoose from 'mongoose';

const homeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL/Path
    required: false
  },
  status: {
    type: String,
    default: 'Currently working on Portfolio'
  }
}, {
  timestamps: true
});

export default mongoose.model('Home', homeSchema);
