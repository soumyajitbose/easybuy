const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard'); // Redirect to dashboard if already logged in
    }
    next();
};

module.exports = { redirectIfAuthenticated };