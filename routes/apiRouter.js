const router = require('express').Router();
const apiAuthenticationRouter = require('./apiRoutes/apiAuthenticationRouter');
const apiUserInfoRouter = require('./apiRoutes/apiUserInfoRouter');

router.use('/auth', apiAuthenticationRouter);
router.use('/user', apiUserInfoRouter);

module.exports = router;