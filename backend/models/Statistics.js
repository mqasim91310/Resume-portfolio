const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema(
    {
        clients: { type: Number, default: 0 },
        projects: { type: Number, default: 0 },
        experience: { type: Number, default: 0 },
        awards: { type: Number, default: 0 },
        certificates: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Statistics', statisticsSchema);
