const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: 'Muhammad Qasim' },
        designation: { type: String, default: 'Computer Science Student & Flutter Developer' },
        biography: { type: String, default: '' },
        profileImage: { type: String, default: '' },
        resumeFile: { type: String, default: '' },
        socialLinks: {
            github: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            email: { type: String, default: '' },
            twitter: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
