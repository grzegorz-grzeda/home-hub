const router = require('express').Router();
const apiAuthenticationRouter = require('./apiRoutes/apiAuthenticationRouter');
const apiUserInfoRouter = require('./apiRoutes/apiUserInfoRouter');
const apiDeviceRouter = require('./apiRoutes/apiDeviceRouter');
const apiDeviceTypeRouter = require('./apiRoutes/apiDeviceTypeRouter');
const apiFirmwareRouter = require('./apiRoutes/apiFirmwareRouter');

router.use('/auth', apiAuthenticationRouter);
router.use('/user', apiUserInfoRouter);
router.use('/device', apiDeviceRouter);
router.use('/device-type', apiDeviceTypeRouter);
router.use('/firmware', apiFirmwareRouter);

module.exports = router;