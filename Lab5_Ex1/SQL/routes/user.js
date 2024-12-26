const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Lab5_Ex1'
});

// View all Users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      return res.status(500).json({
        action: 'view',
        status: 'failure',
        Users: [],
        error: err.message
      });
    }
    res.json({
      action: 'view',
      status: 'success',
      Users: results
    });
  });
});

// Add a new User
router.post('/', (req, res) => {
  const { FullName, Address, RegistrationDate } = req.body;
  const query = 'INSERT INTO Users (FullName, Address, RegistrationDate) VALUES (?, ?, ?)';

  db.query(query, [FullName, Address, RegistrationDate], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'add',
        status: 'failure',
        Users: {},
        error: err.message
      });
    }

    db.query('SELECT * FROM Users WHERE UserId = ?', [result.insertId], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'add',
          status: 'failure',
          Users: {},
          error: err.message
        });
      }
      res.json({
        action: 'add',
        status: 'success',
        Users: rows[0]
      });
    });
  });
});

// Update a User
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { FullName, Address, RegistrationDate } = req.body;
  const query = 'UPDATE Users SET FullName = ?, Address = ?, RegistrationDate = ? WHERE UserId = ?';

  db.query(query, [FullName, Address, RegistrationDate, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'update',
        status: 'failure',
        Users: {},
        error: err.message
      });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        action: 'update',
        status: 'failure',
        Users: {},
        message: 'User not found'
      });
    }

    db.query('SELECT * FROM Users WHERE UserId = ?', [id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'update',
          status: 'failure',
          Users: {},
          error: err.message
        });
      }
      res.json({
        action: 'update',
        status: 'success',
        Users: rows[0]
      });
    });
  });
});

// Delete a User
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Users WHERE UserId = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'delete',
        status: 'failure',
        Users: {},
        error: err.message
      });
    }

    // Check if any rows were deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        action: 'delete',
        status: 'failure',
        Users: {},
        message: 'User not found'
      });
    }

    res.json({
      action: 'delete',
      status: 'success',
      Users: { UserId: id }
    });
  });
});

module.exports = router;
