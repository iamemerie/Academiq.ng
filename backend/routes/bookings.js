const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// Import clean controller methods
const { 
  createBooking, 
  getMyBookings, 
  updateBookingStatus 
} = require('../controllers/bookingController');

// Define routes cleanly mapping to traffic logic
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;