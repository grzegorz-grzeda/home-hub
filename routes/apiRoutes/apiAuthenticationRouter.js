const router = require('express').Router();
const passport = require('passport');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per `window`
    message: 'Too many login attempts, please try again later.'
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
}

function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Already authenticated' });
}

router.post('/login', loginLimiter, ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
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
                res.json({ message: `Logged in successfully` });
            });
        });
    })(req, res, next);
});

router.post('/logout', ensureAuthenticated, (req, res) => {
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

module.exports = router;