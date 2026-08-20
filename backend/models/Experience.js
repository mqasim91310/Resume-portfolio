const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
    {
        company: { type: String, required: true, trim: true },
        position: { type: String, required: true, trim: true },
        department: { type: String, default: '' },
        duration: { type: String, required: true, trim: true },
        mode: { type: String, default: '' },
        description: { type: String, default: '' },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
