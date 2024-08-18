const router = require('express').Router();

router.get('/', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    })
})

module.exports = router;