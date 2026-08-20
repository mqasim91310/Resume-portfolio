const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        technologies: { type: String, required: true },
        role: { type: String, default: '' },
        features: { type: String, default: '' },
        githubLink: { type: String, default: '' },
        liveDemoLink: { type: String, default: '' },
        images: [{ type: String }],
        category: { type: String, default: 'other', trim: true },
        semester: { type: Number, min: 1, max: 8 },
        featured: { type: Boolean, default: false },
        status: { type: String, enum: ['completed', 'upcoming', 'in-progress'], default: 'completed' },
        createdDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
