import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    github: String,
    linkedin: String,
    image: String // URL or path to image
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
