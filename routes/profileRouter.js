const router = require('express').Router();
const loginHandling = require('../middleware/loginHandling');

router.use(loginHandling.ensureAuthenticated);

router.get('/', async (req, res) => {
    res.render('profile');
});

module.exports = router;