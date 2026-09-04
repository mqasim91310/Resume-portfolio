const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        // Optional short value-proposition bullets, one per line in the
        // admin form (e.g. "Responsive layouts across devices"). Stored as
        // a single newline-delimited string, consistent with how the admin
        // panel edits it, and split into a list at render time.
        bullets: { type: String, default: '' },
        icon: { type: String, default: '' },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
