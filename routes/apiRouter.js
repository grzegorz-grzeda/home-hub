const router = require('express').Router();
const apiAuthenticationRouter = require('./apiRoutes/apiAuthenticationRouter');

router.use('/auth', apiAuthenticationRouter);

module.exports = router;