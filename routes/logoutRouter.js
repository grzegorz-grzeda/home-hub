const router = require('express').Router();
const loginService = require('../services/loginService');

router.get('/', loginService.ensureAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    })
})

module.exports = router;