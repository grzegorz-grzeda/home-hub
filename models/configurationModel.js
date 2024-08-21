const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
        unique: true
    },
    configuration: {
        type: Object,
        required: true
    }
});

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;