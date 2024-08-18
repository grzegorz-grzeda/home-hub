const router = require('express').Router();
const passport = require('passport');

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;