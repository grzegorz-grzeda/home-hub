const mongoose = require('mongoose');

const currentDeviceStateSchema = new mongoose.Schema({
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
    configurationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Configuration',
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const CurrentDeviceStateModel = mongoose.model('CurrentDeviceFirmware', currentDeviceStateSchema);

module.exports = CurrentDeviceStateModel;