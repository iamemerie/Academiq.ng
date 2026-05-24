const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // Import the Request model to interact with the requests collection in MongoDB
const protect = require('../middleware/authMiddleware'); // Import the authentication middleware to protect routes

// Route to create a new request
router.post('/', protect, async (req, res) => {
  try {
    const { title, subject, description, deadline, level } = req.body;

    const newRequest = new Request({
      title,
      subject,
      description,
      deadline,
      level,
      student: req.user.userId, // Associate the request with the authenticated user's ID
    });

    await newRequest.save(); // Save the new request to the database

    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new request

//Get all request by logged in student
router.get('/my-requests', protect, async (req, res) => {
  try {
    const requests = await Request.find({ student: req.user.userId })
    res.status(200).json(requests); // Find requests associated with the authenticated user's ID and populate student details
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//Get all open requests( for tutor to browse)
router.get('/all', protect, async (req, res) => {
  try {
    const requests = await Request.find({ status: 'open' })
    .populate('student', 'fullName email bio school level') // Populate the student field with the fullName and email of the associated user
    .sort({ createdAt: -1 }); // Sort requests by creation date in descending order
    res.status(200).json(requests); // find all open requests.
    }
  catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router; // Export the router to be used in other parts of the application