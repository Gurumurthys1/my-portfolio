import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
