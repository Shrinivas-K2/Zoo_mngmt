const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to add a new employee
router.post('/employee', (req, res) => {
    const { employeeName, role, contactInfo, salary, zooID } = req.body;

    const query = `
        INSERT INTO Employee (Name, Role, Contact_Info, Salary, Zoo_ID)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [employeeName, role, contactInfo, salary, zooID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding employee.');
        }
        res.send('Employee added successfully.');
    });
});

// Route to get all employees
router.get('/employee', (req, res) => {
    const query = 'SELECT * FROM Employee';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving employees.');
        }
        res.json(results);
    });
});

// Route to delete an employee by ID
router.delete('/delete-employee/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Employee WHERE Employee_ID = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting employee.');
        }
        res.send('Employee deleted successfully.');
    });
});

module.exports = router;
