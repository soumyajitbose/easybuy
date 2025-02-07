const express = require('express');
const router = express.Router();
const { add } = require('../controllers/categoryController');

const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/'); // Redirect to login if not authenticated
    }
    next();
};

// Protect category route
router.get('/', requireAuth, (req, res) => {
    res.render('category/view', { title: 'Category', username: req.session.username });
});

//router.post('/category', add); 

module.exports = router;