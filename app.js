require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const categoryRoutes = require('./routes/category');

const app = express();

// Use session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: true
}));



app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    // Default to 'main' layout for authenticated users
    res.locals.layout = req.session.userId ? "layouts/main" : "layouts/auth";
    next();
});


app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/category', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});