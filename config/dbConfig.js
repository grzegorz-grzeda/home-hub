const mongoose = require('mongoose');

const connectToDb = function (url) {
    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

module.exports = {
    connectToDb: connectToDb
};