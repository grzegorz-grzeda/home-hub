const router = require('express').Router();
const apiAuthenticationRouter = require('./apiRoutes/apiAuthenticationRouter');
const apiUserInfoRouter = require('./apiRoutes/apiUserInfoRouter');
const apiDeviceRouter = require('./apiRoutes/apiDeviceRouter');

router.use('/auth', apiAuthenticationRouter);
router.use('/user', apiUserInfoRouter);
router.use('/device', apiDeviceRouter);

module.exports = router;