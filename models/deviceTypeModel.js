const mongoose = require('mongoose');

const deviceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DeviceType = mongoose.model('DeviceType', deviceTypeSchema);

module.exports = DeviceType;