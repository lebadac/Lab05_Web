const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Lab5_Ex1'
});

// View all ShoppingCart items
router.get('/', (req, res) => {
  db.query('SELECT * FROM ShoppingCart', (err, results) => {
    if (err) {
      return res.status(500).json({
        action: 'view',
        status: 'failure',
        ShoppingCart: [],
        error: err.message
      });
    }
    res.json({
      action: 'view',
      status: 'success',
      ShoppingCart: results
    });
  });
});

// Add an item to ShoppingCart
router.post('/', (req, res) => {
  const { UserId, ProductId, Quantity } = req.body;
  const query = 'INSERT INTO ShoppingCart (UserId, ProductId, Quantity) VALUES (?, ?, ?)';

  db.query(query, [UserId, ProductId, Quantity], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'add',
        status: 'failure',
        ShoppingCart: {},
        error: err.message
      });
    }

    db.query('SELECT * FROM ShoppingCart WHERE CartId = ?', [result.insertId], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'add',
          status: 'failure',
          ShoppingCart: {},
          error: err.message
        });
      }
      res.json({
        action: 'add',
        status: 'success',
        ShoppingCart: rows[0]
      });
    });
  });
});

// Update an item in ShoppingCart
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { UserId, ProductId, Quantity } = req.body;
  const query = 'UPDATE ShoppingCart SET UserId = ?, ProductId = ?, Quantity = ? WHERE CartId = ?';

  db.query(query, [UserId, ProductId, Quantity, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'update',
        status: 'failure',
        ShoppingCart: {},
        error: err.message
      });
    }

    db.query('SELECT * FROM ShoppingCart WHERE CartId = ?', [id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'update',
          status: 'failure',
          ShoppingCart: {},
          error: err.message
        });
      }
      res.json({
        action: 'update',
        status: 'success',
        ShoppingCart: rows[0]
      });
    });
  });
});

// Delete an item from ShoppingCart
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM ShoppingCart WHERE CartId = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'delete',
        status: 'failure',
        ShoppingCart: {},
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        action: 'delete',
        status: 'failure',
        message: 'Cart item not found'
      });
    }

    res.json({
      action: 'delete',
      status: 'success',
      ShoppingCart: { CartId: id }
    });
  });
});

module.exports = router;
