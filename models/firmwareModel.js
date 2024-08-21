const mongoose = require('mongoose');

const firmwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
        unique: true
    },
    deviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    binary: {
        type: Buffer
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Firmware = mongoose.model('Firmware', firmwareSchema);

module.exports = Firmware;