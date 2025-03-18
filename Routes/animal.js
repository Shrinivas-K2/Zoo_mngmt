const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if necessary

// Add Animal Route
router.post('/animal', (req, res) => {
    const { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId } = req.body;

    const query = `
        INSERT INTO animal (Name, Species, Age, Gender, Health_Status, Feed_Schedule, Enclosure_ID, Zoo_ID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Inserting animal with:', { name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId });

    db.query(query, [name, species, age, gender, healthStatus, feedSchedule, enclosureId, zooId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Error adding animal.');
        }
        res.send('Animal added successfully!');
    });
});


//route to get all the animal details 
// Route to get all animals
router.get('/animal', (req, res) => {
    const query = 'SELECT * FROM animal';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving animals:', err);
            return res.status(500).json({ error: 'Error retrieving animals' });
        }
        res.json(results); // Send the animal data as JSON
    });
});




router.get('/animals/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS totalAnimals FROM Animal';
    
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error counting animals:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Send the count as JSON
        res.json({ totalAnimals: result[0].totalAnimals });
    });
});



// Correct DELETE route
router.delete('/animal/:id', (req, res) => {
    const { id } = req.params; // Retrieve the ID from the URL

    const query = 'DELETE FROM animal WHERE Animal_ID = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting animal:', err);
            return res.status(500).json({ error: 'Error deleting animal' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Animal not found' });
        }

        res.json({ message: 'Animal deleted successfully' });
    });
});

module.exports = router;