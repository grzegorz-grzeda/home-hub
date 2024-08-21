const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
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