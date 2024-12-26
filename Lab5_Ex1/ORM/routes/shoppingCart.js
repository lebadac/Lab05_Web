const express = require('express');
const router = express.Router();
const ShoppingCart = require('../models/shoppingCart');

// Retrieve all items in the shopping cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await ShoppingCart.findAll();
    res.status(200).json({
      action: 'view',
      status: 'success',
      ShoppingCart: cartItems
    });
  } catch (error) {
    res.status(500).json({
      action: 'view',
      status: 'failure',
      error: error.message
    });
  }
});

// Add an item to the shopping cart
router.post('/', async (req, res) => {
  try {
    const cartItem = await ShoppingCart.create(req.body);
    res.status(201).json({
      action: 'add',
      status: 'success',
      ShoppingCart: cartItem
    });
  } catch (error) {
    res.status(500).json({
      action: 'add',
      status: 'failure',
      error: error.message
    });
  }
});

// Update a cart item by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await ShoppingCart.update(req.body, {
      where: { CartId: id },
    });

    if (updated) {
      const updatedCartItem = await ShoppingCart.findByPk(id);
      res.status(200).json({
        action: 'update',
        status: 'success',
        ShoppingCart: updatedCartItem
      });
    } else {
      res.status(404).json({
        action: 'update',
        status: 'failure',
        message: 'Cart item not found'
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

// Delete a cart item by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShoppingCart.destroy({
      where: { CartId: id },
    });

    if (deleted) {
      res.status(200).json({
        action: 'delete',
        status: 'success',
        message: 'Cart item deleted successfully'
      });
    } else {
      res.status(404).json({
        action: 'delete',
        status: 'failure',
        message: 'Cart item not found'
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
