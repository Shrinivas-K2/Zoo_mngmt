/*
// Import required modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');

// Initialize Express app
const app = express();

//-------------------------------signup--------------------------
const signupRouter = require('./Routes/signup'); // Path to your signup route

app.set('view engine', 'ejs'); // Set EJS as the templating engine

app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(signupRouter);

// Route for signup success page
app.get('/signupSuccess', (req, res) => {
    const { username, email } = req.query;
    res.render('signupSuccess', { username, email });
});

// ------------------------------------------signup-------------------

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root123', // Replace with your MySQL password
    database: 'zoomanagement'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});
// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'your-secret-key',  // Change this to a more secure key
    resave: false,
    saveUninitialized: true
}));

// GET route for the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// POST route to handle login
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // Query to check if user with specified role exists
    const query = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

    db.query(query, [username, password, role], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            // Store the username and role in the session
            req.session.username = username;
            req.session.role = role;

            // Redirect based on the role
            if (role === 'admin') {
                res.redirect('/admin-dashboard');
            } else if (role === 'employee') {
                res.redirect('/employee-dashboard');
            } else if (role === 'visitor') {
                res.redirect('/visitor-dashboard');
            }
        } else {
            // Redirect to login with an error parameter
            res.redirect('/?error=1');
        }
    });
});

// Routes for dashboard pages
app.get('/admin-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'admin') {
        res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/employee-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'employee') {
        res.sendFile(path.join(__dirname, 'public', 'employee-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/visitor-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'visitor') {
        res.sendFile(path.join(__dirname, 'public', 'visitor.html'));
    } else {
        res.redirect('/');
    }
});

// Display username in the header of dashboards
app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        const username = req.session.username; // Fetch from session
        res.render('dashboard', { username });  // Pass username to the template
    } else {
        res.redirect('/');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

*/


// ----

/*
// Import required modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');


// Initialize Express app
const app = express();

// Middleware and template engine setup
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

/* MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root123', // Replace with your MySQL password
    database: 'zoomanagement'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db; // Export the db object

// MySQL database connection (Uses environment variables)
const db = mysql.createConnection({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = db; // Export the db object

// Session configuration
app.use(session({
    secret: 'your-secret-key',  // Change this to a more secure key
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // Session expires after 1 hour
    }
}));

// Import and use signup route
const signupRouter = require('./Routes/signup');
app.use(signupRouter);

// Route for signup success page
app.get('/signupSuccess', (req, res) => {
    const { username, email } = req.query;
    res.render('signupSuccess', { username, email });
});

// GET route for the login page
app.get('/', (req, res) => {
    const error = req.query.error ? 'Invalid credentials, please try again.' : '';
    res.render('login', { error });
});

// POST route to handle login
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    const query = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

    db.query(query, [username, password, role], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            req.session.username = username;
            req.session.role = role;

            if (role === 'admin') {
                res.redirect('/admin-dashboard');
            } else if (role === 'employee') {
                res.redirect('/employee-dashboard');
            } else if (role === 'visitor') {
                res.redirect('/visitor');
            }
        } else {
            res.redirect('/?error=1');
        }
    });
});

// Routes for dashboard pages based on role
app.get('/admin-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'admin') {
        res.sendFile(path.join(__dirname, 'public/admin-dashboard', 'admin-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/employee-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'employee') {
        res.sendFile(path.join(__dirname, 'public/employee-dashboard', 'employee-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/visitor', (req, res) => {
    if (req.session.username && req.session.role === 'visitor') {
        res.sendFile(path.join(__dirname, 'public', 'visitor.html'));
    } else {
        res.redirect('/');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        res.redirect('/');
    });
});

const animalRoutes = require('./Routes/animal');
app.use('/', animalRoutes); // Adjust the path as needed


// employee
const employeeRoutes = require('./Routes/employee');
app.use('/' , employeeRoutes);

//ticket
const ticketRoutes = require('./Routes/ticket');
app.use('/' , ticketRoutes);

const animal_empRoutes = require('./Routes/animal-emp');
app.use('/animal-emp', animal_empRoutes); // All routes in animal-emp.js are prefixed with /animal-emp


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

*/



// Import required modules
const express = require('express');
const mysql = require('mysql2'); // Use mysql2 instead of mysql for better Vercel support
const path = require('path');
const session = require('express-session');
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();

// Middleware and template engine setup
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// MySQL database connection (Uses environment variables)
const db = mysql.createConnection({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

module.exports = db; // Export the db object

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secure session key
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // Session expires after 1 hour
    }
}));

// Import and use routes
const signupRouter = require('./Routes/signup');
app.use(signupRouter);

const animalRoutes = require('./Routes/animal');
app.use('/', animalRoutes);

const employeeRoutes = require('./Routes/employee');
app.use('/', employeeRoutes);

const ticketRoutes = require('./Routes/ticket');
app.use('/', ticketRoutes);

const animal_empRoutes = require('./Routes/animal-emp');
app.use('/animal-emp', animal_empRoutes);

// Route for signup success page
app.get('/signupSuccess', (req, res) => {
    const { username, email } = req.query;
    res.render('signupSuccess', { username, email });
});

// Login Page
app.get('/', (req, res) => {
    const error = req.query.error ? 'Invalid credentials, please try again.' : '';
    res.render('login', { error });
});

// POST route to handle login
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    const query = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;

    db.query(query, [username, password, role], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            req.session.username = username;
            req.session.role = role;

            if (role === 'admin') {
                res.redirect('/admin-dashboard');
            } else if (role === 'employee') {
                res.redirect('/employee-dashboard');
            } else if (role === 'visitor') {
                res.redirect('/visitor');
            }
        } else {
            res.redirect('/?error=1');
        }
    });
});

// Routes for dashboard pages based on role
app.get('/admin-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'admin') {
        res.sendFile(path.join(__dirname, 'public/admin-dashboard', 'admin-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/employee-dashboard', (req, res) => {
    if (req.session.username && req.session.role === 'employee') {
        res.sendFile(path.join(__dirname, 'public/employee-dashboard', 'employee-dashboard.html'));
    } else {
        res.redirect('/');
    }
});

app.get('/visitor', (req, res) => {
    if (req.session.username && req.session.role === 'visitor') {
        res.sendFile(path.join(__dirname, 'public', 'visitor.html'));
    } else {
        res.redirect('/');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        res.redirect('/');
    });
});

// Export Express app for Vercel
module.exports = app;
