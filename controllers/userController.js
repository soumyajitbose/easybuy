const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel  = require('../models/userModel');

const JWT_SECRET = process.env.SESSION_SECRET || '45875W51';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password
    
        await userModel.insertUser(name, email, hashedPassword);
    
        res.redirect('/'); // Redirect to login after successful registration
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
      }
    
};


const login = async (req, res) => {
        const { email, password } = req.body; // Get email and password from the form
    try {
        if (!email || !password) {
            return res.status(400).render('login', { title: 'Sign In', error: 'Email and password are required' });
        }
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).render('login', { title: 'Sign In', error: 'Email not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);  
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(400).render('login', { title: 'Sign In', error: 'Incorrect password' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.email }, JWT_SECRET, { expiresIn: '1h' });

        req.session.userId = user.id;
        req.session.useremail = user.email;
        req.session.username = user.name;
        req.session.token = token;

        //return res.json({ message: 'Login successful', token });
        console.log('Login successful, redirecting...');
        return res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        req.session.error = 'Server error, please try again';
        return res.redirect('/');
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Could not log out');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        return res.redirect('/'); // Redirect to login page
    });
};

module.exports = { registerUser, login, logout };