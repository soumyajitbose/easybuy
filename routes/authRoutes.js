const express = require('express');
const { registerUser, login, logout } = require('../controllers/userController');
const { redirectIfAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', redirectIfAuthenticated, (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;
  res.render('login', { title: 'Sign In', layout: 'layouts/auth', error });
});

// Handle login form submission
router.post('/', login);
router.get('/logout', logout);

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', layout: 'layouts/auth'  });
});

router.post('/register', registerUser); 

function ensureAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
      return next();
  }
  res.redirect('/'); // Redirect to login if not authenticated
}

module.exports = router;