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
    }
}