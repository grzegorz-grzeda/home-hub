const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    firmware: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firmware'
    },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;