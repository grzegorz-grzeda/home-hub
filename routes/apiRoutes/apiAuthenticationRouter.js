const router = require('express').Router();
const passport = require('passport');
const loginHandling = require('../../middleware/loginHandling');

router.post('/login', loginHandling.loginLimiter, loginHandling.ensureApiNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(`err: ${err}, user: ${user}, info: ${info}`);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: `Invalid email or password` });
        }

        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }

            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.json({ message: `Logged in successfully`, user: user._id });
            });
        });
    })(req, res, next);
});

router.post('/logout', loginHandling.loginLimiter, loginHandling.ensureApiAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out' });
        });
    });
});

router.get('/session', loginHandling.ensureApiAuthenticated, (req, res) => {
    return res.json({ message: 'Authenticated', user: req.user._id });
});

module.exports = router;