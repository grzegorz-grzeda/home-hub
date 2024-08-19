const router = require('express').Router();
const loginService = require('../services/loginService');

router.get('/', loginService.ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    })
})

module.exports = router;