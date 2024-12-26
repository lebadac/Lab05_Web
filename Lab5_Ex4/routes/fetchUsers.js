const express = require('express');
const axios = require('axios');
const User = require('../models/user'); // Import model User
const router = express.Router();

router.get('/fetch-and-save', async (req, res) => {
    try {

        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;


        await User.bulkCreate(users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website
        })));

        res.status(200).json({ success: true, message: 'Users fetched and saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch and save users', error });
    }
});

// Get all users from the database
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error });
    }
});

module.exports = router;
