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
    firmwareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firmware',
    },
    configurationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Configuration',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;