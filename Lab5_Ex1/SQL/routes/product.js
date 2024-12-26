const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Lab5_Ex1'
});

// View all Product
router.get('/', (req, res) => {
  db.query('SELECT * FROM Product', (err, results) => {
    if (err) {
      return res.status(500).json({
        action: 'view',
        status: 'failure',
        Product: []
      });
    }
    res.json({
      action: 'view',
      status: 'success',
      Product: results
    });
  });
});

// Add a Product
router.post('/', (req, res) => {
  const { ProductName, Price, ManufacturingDate } = req.body;
  const query = 'INSERT INTO Product (ProductName, Price, ManufacturingDate) VALUES (?, ?, ?)';

  db.query(query, [ProductName, Price, ManufacturingDate], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'add',
        status: 'failure',
        Product: {}
      });
    }

    db.query('SELECT * FROM Product WHERE ProductId = ?', [result.insertId], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'add',
          status: 'failure',
          Product: {}
        });
      }
      res.json({
        action: 'add',
        status: 'success',
        Product: rows[0]
      });
    });
  });
});

// Update a Product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ProductName, Price, ManufacturingDate } = req.body;
  const query = 'UPDATE Product SET ProductName = ?, Price = ?, ManufacturingDate = ? WHERE ProductId = ?';

  db.query(query, [ProductName, Price, ManufacturingDate, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'update',
        status: 'failure',
        Product: {}
      });
    }

    db.query('SELECT * FROM Product WHERE ProductId = ?', [id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          action: 'update',
          status: 'failure',
          Product: {}
        });
      }
      res.json({
        action: 'update',
        status: 'success',
        Product: rows[0]
      });
    });
  });
});

// Delete a Product
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Product WHERE ProductId = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        action: 'delete',
        status: 'failure',
        Product: {}
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        action: 'delete',
        status: 'failure',
        message: 'Product not found'
      });
    }

    res.json({
      action: 'delete',
      status: 'success',
      Product: { ProductId: id }
    });
  });
});

module.exports = router;
