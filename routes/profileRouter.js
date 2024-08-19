const router = require('express').Router();
const loginService = require('../services/loginService');

router.get('/', loginService.ensureAuthenticated, async (req, res) => {
    res.render('profile');
});

module.exports = router;