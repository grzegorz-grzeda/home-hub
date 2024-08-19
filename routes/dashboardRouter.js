const router = require('express').Router();
const loginService = require('../services/loginService');

router.get('/', loginService.ensureAuthenticated, async (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;