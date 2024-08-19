const router = require('express').Router();
const userService = require('../services/userService');
const loginHandling = require('../middleware/loginHandling');
const adminHandling = require('../middleware/adminHandling');

router.use(loginHandling.ensureAuthenticated);
router.use(adminHandling.ensureAdmin);

router.get('/', async (req, res) => {
    res.redirect('/user/list');
});

router.get('/list', async (req, res) => {
    const users = await userService.getUsers();
    res.render('user/list', { users: users });
});

router.get('/details/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.render('user/details', { user: user });
});

router.get('/create', async (req, res) => {
    res.render('user/update', { update: { message: "Create User" } });
});

router.post('/create', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name,
        email,
        password);
    await userService.createUser(name, email, password);
    res.redirect('/user/list');
});

router.get('/update/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.render('user/update', { update: { message: "Update User", user: user } });
});

router.post('/update/:id', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    await userService.updateUser(req.params.id, name, email, password);
    res.redirect('/user/list');
});

module.exports = router;