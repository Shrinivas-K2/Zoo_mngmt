const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // Replace with the actual path to your database connection file

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, role, phone } = req.body;

    try {
        // Step 1: Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        // Step 2: Insert into Visitor table
        const visitorQuery = `INSERT INTO Visitor (Name, Email, Phone) VALUES (?, ?, ?)`;
        db.query(visitorQuery, [username, email, phone], (err, visitorResult) => {
            if (err) {
                console.error('Error inserting into Visitor table:', err);
                res.status(500).send('Internal server error: could not insert into Visitor table');
                return;
            }

            // Step 3: Retrieve the new Visitor_ID
            const visitorId = visitorResult.insertId;
            console.log("New Visitor ID:", visitorId);

            // Step 4: Insert into Users table using Visitor_ID as the reference
            const userQuery = `INSERT INTO Users (Username, Password, Role, Visitor_Reference_ID) VALUES (?, ?, ?, ?)`;
            db.query(userQuery, [username, hashedPassword, role, visitorId], (err, userResult) => {
                if (err) {
                    console.error('Error inserting into Users table:', err);
                    res.status(500).send('Internal server error: could not insert into Users table');
                    return;
                }

                // Successfully inserted both records, redirect to the success page
                console.log('User created successfully:', { username, email });
                res.redirect(`/signupSuccess?username=${username}&email=${email}`);
            });
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error: could not complete signup');
    }
});

module.exports = router;
