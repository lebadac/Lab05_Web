const express = require('express');
const router = express.Router();
const User = require('../models/user');

// View all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      action: 'view',
      status: 'success',
      Users: users
    });
  } catch (err) {
    console.error('Error fetching users:', err); // Log error for debugging
    res.status(500).json({
      action: 'view',
      status: 'failure',
      error: err.message
    });
  }
});

// Add a User
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      action: 'add',
      status: 'success',
      Users: user
    });
  } catch (err) {
    console.error('Error adding user:', err); // Log error for debugging
    res.status(500).json({
      action: 'add',
      status: 'failure',
      error: err.message
    });
  }
});

// Update a User
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        action: 'update',
        status: 'failure',
        message: `User with id ${id} not found`
      });
    }

    await user.update(req.body);
    res.json({
      action: 'update',
      status: 'success',
      Users: user
    });
  } catch (err) {
    console.error(`Error updating user with id ${req.params.id}:`, err); // Log error for debugging
    res.status(500).json({
      action: 'update',
      status: 'failure',
      message: 'Error updating user',
      error: err.message
    });
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        action: 'delete',
        status: 'failure',
        message: `User with id ${id} not found`
      });
    }

    await user.destroy();
    res.json({
      action: 'delete',
      status: 'success',
      Users: { UserId: id }
    });
  } catch (err) {
    console.error(`Error deleting user with id ${req.params.id}:`, err); // Log error for debugging
    res.status(500).json({
      action: 'delete',
      status: 'failure',
      message: 'Error deleting user',
      error: err.message
    });
  }
});

module.exports = router;
