const express = require('express');
const router = express.Router();
const loginHandling = require('../../middleware/loginHandling');
const userModel = require('../../models/userModel');

router.get('/', loginHandling.ensureApiAuthenticated, async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user._id }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;