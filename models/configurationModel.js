const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    version: {
        type: String,
        required: true
    },
    configuration: {
        type: Object,
        required: true
    }
});

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;