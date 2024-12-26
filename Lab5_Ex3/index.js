const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const imageRoutes = require('./routes/images'); 

// Middleware to parse JSON
app.use(bodyParser.json()); 

// Use the image routes
app.use('/image', imageRoutes); 

// Set the server port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log when the server is up and running
});
