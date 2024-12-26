const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Retrieve all Product
router.get('/', async (req, res) => {
  try {
    const Product = await Product.findAll();
    res.status(200).json({
      action: 'view',
      status: 'success',
      Product: Product
    });
  } catch (error) {
    res.status(500).json({
      action: 'view',
      status: 'failure',
      error: error.message
    });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      action: 'add',
      status: 'success',
      Product: product
    });
  } catch (error) {
    res.status(500).json({
      action: 'add',
      status: 'failure',
      error: error.message
    });
  }
});


// Retrieve a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json({
        action: 'view',
        status: 'success',
        Product: product
      });
    } else {
      res.status(404).json({
        action: 'view',
        status: 'failure',
        message: 'Product not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      action: 'view',
      status: 'failure',
      error: error.message
    });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { ProductId: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json({
        action: 'update',
        status: 'success',
        Product: updatedProduct
      });
    } else {
      res.status(404).json({
        action: 'update',
        status: 'failure',
        message: 'Product not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      action: 'update',
      status: 'failure',
      error: error.message
    });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { ProductId: req.params.id },
    });
    if (deleted) {
      res.status(200).json({
        action: 'delete',
        status: 'success',
        message: 'Product deleted'
      });
    } else {
      res.status(404).json({
        action: 'delete',
        status: 'failure',
        message: 'Product not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      action: 'delete',
      status: 'failure',
      error: error.message
    });
  }
});

module.exports = router;
