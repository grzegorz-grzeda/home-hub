const router = require('express').Router();
const passport = require('passport');
const loginService = require('../services/loginService');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per `window`
    message: 'Too many login attempts, please try again later.'
});

router.get('/', loginService.ensureNotAuthenticated, async (req, res) => {
    res.render('login');
});

router.post('/', loginLimiter, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        req.session.regenerate((err) => {
            if (err) {
                return next(err);
            }

            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/dashboard');
            });
        });
    })(req, res, next);
});

module.exports = router;