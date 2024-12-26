const fs = require('fs'); // Import the fs module
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer to save files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: './uploads', // Set the destination folder for uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Set the filename as a timestamp followed by the original file name
    }
});

const upload = multer({ storage }); // Initialize multer with the specified storage configuration

// Endpoint to upload a single image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({ success: true, filePath: `/uploads/${req.file.filename}` }); // Return the file path of the uploaded image
});

// Endpoint to list all uploaded images
router.get('/all', (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads'); // Path to the uploads directory
    
    // Check if the uploads directory exists
    fs.access(uploadsDir, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Uploads directory not found' }); // If directory does not exist
        }

        // Read the contents of the uploads directory
        fs.readdir(uploadsDir, (err, files) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Failed to read uploads directory', error: err }); // If there was an error reading the directory
            }

            // Generate URLs for each file in the uploads directory
            const fileUrls = files.map(file => `http://localhost:3000/image/view/${file}`);
            res.status(200).json({ success: true, files: fileUrls }); // Return the list of file URLs
        });
    });
});

// Endpoint to view a specific image
router.get('/view/:imageName', (req, res) => {
    const { imageName } = req.params; // Extract the image name from the request parameters
    const imagePath = path.join(__dirname, '../uploads', imageName); // Construct the path to the image

    // Check if the image exists before sending it
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'Image not found' }); // If the image does not exist
        }

        // Send the image file to the user
        res.sendFile(imagePath, (err) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Failed to send image', error: err }); // If there was an error sending the image
            }
        });
    });
});

module.exports = router;
