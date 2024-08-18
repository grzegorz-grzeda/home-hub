const userModel = require('../models/userModel');

const roles = ['user', 'admin'];

const createUser = async (name, email, password) => {
    const user = new userModel({ name: name, email: email, password: password, roles: ['user'] });
    await user.save();
}

const updateUser = async (id, name, email, password) => {
    const user
        = await userModel.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (password) {
        user.password = password;
    }
    await user.save();
}

const getUsers = async () => {
    return userModel.find();
}

const getUser = async (id) => {
    return userModel.findById(id);
}

module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUser,
};