const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const protect = require('../middleware/authMiddleware'); // Import the authentication middleware to protect routes

// Route to create a new booking
router.post('/', protect, async (req, res) => {
  try {
    const { requestId, tutorId } = req.body;

    const newBooking = new Booking({
      request: requestId,
      tutor: tutorId,
      student: req.user.userId, // Associate the booking with the authenticated user's ID
    });
    await newBooking.save(); // Save the new booking to the database

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router; // Export the router to be used in other parts of the application