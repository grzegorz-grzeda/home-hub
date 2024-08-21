const router = require('express').Router();

const DeviceType = require('../../models/deviceTypeModel');
const Firmware = require('../../models/firmwareModel');
const Configuration = require('../../models/configurationModel');

const { ensureApiAuthenticated } = require('../../middleware/loginHandling');
const { ensureApiAdmin } = require('../../middleware/adminHandling');
const upload = require('../../middleware/fileUploadHandling');

router.use(ensureApiAuthenticated);

router.get('/', async (req, res) => {
    try {
        const firmwares = await Firmware.find();
        res.json(firmwares);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', ensureApiAdmin, async (req, res) => {
    try {
        const deviceType = await DeviceType.findById(req.body.deviceType);
        if (!deviceType) {
            return res.status(404).json({ message: 'Device type not found' });
        }
        const firmware = new Firmware({
            name: req.body.name,
            version: req.body.version,
            deviceType: req.body.deviceType,
        });
        const newFirmware = await firmware.save();
        res.status(201).json(newFirmware);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/upload/:id', ensureApiAdmin, upload.single('file'), async (req, res) => {
    try {
        const firmware = await Firmware.findById(req.params.id);
        if (!firmware) {
            return res.status(404).json({ message: 'Firmware not found' });
        }
        const { buffer } = req.file;
        firmware.binary = buffer;
        await firmware.save();
    } catch (error) {
        res.status(400).json({ message: "Invalid file passing" });
    }
});

router.post('/:id', ensureApiAdmin, async (req, res) => {
    const firmware = await Firmware.findById(req.params.id);
    if (!firmware) {
        return res.status(404).json({ message: 'Firmware not found' });
    }
    firmware.name = req.body.name || firmware.name;
    firmware.version = req.body.version || firmware.version;
    if (req.body.deviceType) {
        const deviceType = await DeviceType.findById(req.body.deviceType);
        if (!deviceType) return res.status(404).json({ message: 'Device type not found' });
        firmware.deviceType = req.body.deviceType;
    }
    try {
        const updatedFirmware = await firmware.save();
        res.json(updatedFirmware);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;