const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust this path as per your setup

// Admin route to add a ticket type
router.post('/add-ticket-type', (req, res) => {
    const { typeName, price } = req.body;

    const query = `INSERT INTO ticket_types (Type_Name, Price) VALUES (?, ?)`;
    db.query(query, [typeName, price], (err, result) => {
    if (err) {
        console.error("Database error:", err); // This should log the exact MySQL error
        return res.status(500).send('Error adding ticket type.');
    }
    res.send('Ticket type added successfully.');
    });

});

// Visitor route to purchase a ticket
router.post('/ticket', (req, res) => {
    const { visitorId, zooId, typeId, date } = req.body;

    // Log received data for debugging
    console.log("Received data:", { visitorId, zooId, typeId, date });

    const query = `
        INSERT INTO ticket (Date, Visitor_ID, Zoo_ID, Type_ID, Purchase_Date)
        VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(query, [date, visitorId, zooId, typeId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send('Error purchasing ticket.');
        }
        res.send('Ticket purchased successfully.');
    });
});


// Route to view all ticket types (for visitor view)
router.get('/ticket-types', (req, res) => {
    const query = `SELECT * FROM ticket_types`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching ticket types.');
        }
        res.json(results);
    });
});

module.exports = router;
