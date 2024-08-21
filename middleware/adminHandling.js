function isAdmin(user) {
    return user.roles.includes('admin');
}

module.exports = {
    isAdmin: isAdmin,
    ensureAdmin: (req, res, next) => {
        if (req.isAuthenticated() && isAdmin(req.user)) {
            return next();
        }
        res.redirect('/dashboard');
    },
    ensureApiAdmin: (req, res, next) => {
        if (req.isAuthenticated() && isAdmin(req.user)) {
            return next();
        }
        res.status(401).json({ message: 'Not authenticated as admin' });
    }
}