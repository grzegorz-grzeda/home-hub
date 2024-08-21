const mongoose = require('mongoose');

const currentDeviceFirmwareSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
        unique: true
    },
    firmwareId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firmware',
    },
    firmwareVersion: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const CurrentDeviceFirmwareModel = mongoose.model('CurrentDeviceFirmware', currentDeviceFirmwareSchema);

module.exports = CurrentDeviceFirmwareModel;