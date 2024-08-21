const router = require('express').Router();

const DeviceType = require('../../models/deviceTypeModel');

const { ensureApiAuthenticated } = require('../../middleware/loginHandling');
const { ensureApiAdmin } = require('../../middleware/adminHandling');

router.use(ensureApiAuthenticated);

router.post('/', ensureApiAdmin, async (req, res) => {
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

router.post('/:id', ensureApiAdmin, async (req, res) => {
    const deviceType = await DeviceType.findById(req.params.id);
    if (!deviceType) {
        return res.status(404).json({ message: 'Device type not found' });
    }
    if (req.body.name) {
        deviceType.name = req.body.name;
    }
    if (req.body.description) {
        deviceType.description = req.body.description;
    }
    try {
        const updatedDeviceType = await deviceType.save();
        res.json(updatedDeviceType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const deviceTypes = await DeviceType.find();
        res.json(deviceTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;