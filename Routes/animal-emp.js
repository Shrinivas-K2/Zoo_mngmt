/*
const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if necessary


/// Add an animal using stored procedure
router.post('/animal-emp', (req, res) => {
    const { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId } = req.body;

    // Log the incoming data for debugging
    console.log('Adding animal with data:', { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId });

    const query = `CALL AddAnimal(?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with the passed parameters
    db.query(query, [name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId], (err, result) => {
        if (err) {
            console.error('Error adding animal:', err);
            return res.status(500).json({ error: 'Failed to add animal.' });  // Ensure response is JSON
        }

        // Send a JSON response
        res.json({ message: 'Animal added successfully.' });
    });
});

*/

const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path

// Add an animal using stored procedure
router.post('/', (req, res) => { // Base path is now `/animal-emp`
    const { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId } = req.body;

    // Log incoming data
    console.log('Adding animal with data:', { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId });

    const query = `CALL AddAnimal(?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId], (err) => {
        if (err) {
            console.error('Error adding animal:', err);
            return res.status(500).json({ error: 'Failed to add animal.' });
        }
        res.json({ message: 'Animal added successfully.' });
    });
});

module.exports = router;

