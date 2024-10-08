const router = require('express').Router();

const Device = require('../../models/deviceModel');
const DeviceType = require('../../models/deviceTypeModel');
const Firmware = require('../../models/firmwareModel');
const Configuration = require('../../models/configurationModel');

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

router.post('/', ensureApiAdmin, async (req, res) => {
    const device = new Device({
        name: req.body.name,
        description: req.body.description,
        deviceType: req.body.deviceType
    });

    try {
        const newDevice = await device.save();
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/:id', ensureApiAdmin, async (req, res) => {
    const device = await Device.findById(req.params.id);
    if (!device) {
        return res.status(404).json({ message: 'Device not found' });
    }
    if (req.body.name) {
        device.name = req.body.name;
    }
    if (req.body.description) {
        device.description = req.body.description;
    }
    if (req.body.deviceType) {
        const deviceType = await DeviceType.findById(req.body.deviceType);
        if (!deviceType) {
            return res.status(404).json({ message: 'Device type not found' });
        }
        device.deviceType = req.body.deviceType;
    }
    if (req.body.firmwareId) {
        const firmware = await Firmware.findById(req.body.firmwareId);
        if (!firmware) {
            return res.status(404).json({ message: 'Firmware not found' });
        }
        if (firmware.deviceType != device.deviceType) {
            return res.status(400).json({ message: 'Firmware does not match device type' });
        }
        device.firmwareId = req.body.firmwareId;
    }
    if (req.body.configurationId) {
        const configuration = await Configuration.findById(req.body.configurationId);
        if (!configuration) {
            return res.status(404).json({ message: 'Configuration not found' });
        }
        if (configuration.deviceType != device.deviceType) {
            return res.status(400).json({ message: 'Configuration does not match device type' });
        }
        device.configurationId = req.body.configurationId;
    }
    try {
        device.lastUpdated = Date.now();
        const updatedDevice = await device.save();
        res.json(updatedDevice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;