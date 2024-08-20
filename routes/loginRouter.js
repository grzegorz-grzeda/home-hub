const router = require('express').Router();
const passport = require('passport');
const loginHandling = require('../middleware/loginHandling');

router.use(loginHandling.loginLimiter);
router.use(loginHandling.ensureNotAuthenticated);

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
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