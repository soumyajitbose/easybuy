const express = require('express');
const router = express.Router();

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login if not authenticated
    }
    next();
};

// ✅ Protect dashboard route
router.get('/', requireAuth, (req, res) => {
    res.render('dashboard', { title: 'Dashboard', username: req.session.username });
});

module.exports = router;
