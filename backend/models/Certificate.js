const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        organization: { type: String, required: true, trim: true },
        instructor: { type: String, default: '' },
        issueDate: { type: Date, required: true },
        certificateImage: { type: String, default: '' },
        certificateCode: { type: String, default: '' },
        length: { type: String, default: '' },
        link: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
