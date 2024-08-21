const router = require('express').Router();

const Device = require('../../models/deviceModel');
const DeviceType = require('../../models/deviceTypeModel');

const { ensureApiAuthenticated } = require('../../middleware/loginHandling');
const { ensureApiAdmin } = require('../../middleware/adminHandling');

router.use(ensureApiAuthenticated);

router.get('/', async (req, res) => {
    try {
        const devices = await Device.find().populate('deviceType');
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/device-type', ensureApiAdmin, async (req, res) => {
    const deviceType = new DeviceType({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newDeviceType = await deviceType.save();
        res.status(201).json(newDeviceType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/device-type', async (req, res) => {
    try {
        const deviceTypes = await DeviceType.find();
        res.json(deviceTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;