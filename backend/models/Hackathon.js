import mongoose from 'mongoose';

const hackathonSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a hackathon name'],
    },
    type: {
        type: String,
        enum: ['participation', 'win'],
        default: 'participation',
        required: true
    },
    // Fields for 'win' type
    image: {
        type: String,
        default: ''
    },
    prize: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

export default mongoose.model('Hackathon', hackathonSchema);
