// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'zoomanagement'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;
