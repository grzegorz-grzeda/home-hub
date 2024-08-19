const mongoose = require('mongoose');

const sessionSecretSchema = new mongoose.Schema({
    currentSecret: {
        type: String,
        required: true
    },
    previousSecret: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const SessionSecret = mongoose.model('SessionSecret', sessionSecretSchema);

module.exports = SessionSecret;