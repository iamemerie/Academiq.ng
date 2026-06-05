const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const protect = require('../middleware/authMiddleware');

// @route   POST /api/bookings
// @desc    Create a new booking request link (Student Books Tutor)
router.post('/', protect, async (req, res) => {
  try {
    const { tutorId, requestId } = req.body;

    if (!tutorId || !requestId) {
      return res.status(400).json({ message: 'Missing tutorId or requestId fields' });
    }

    // Explicitly mapping payload properties to your schema definitions
    const newBooking = new Booking({
      student: req.user.userId, // Pulled straight from token via auth middleware
      tutor: tutorId,
      request: requestId,
      status: 'pending' // Defaults to pending so tutor can accept/decline
    });

    await newBooking.save();

    // Fetch populate data immediately so response array mirrors your GET endpoint structures
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email phone')
      .populate('request', 'title subject level deadline');

    res.status(201).json({ message: 'Booking request sent successfully!', booking: populatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating booking instance', error: error.message });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Tutor accepts or declines a booking
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Updated deprecated 'new: true' warning to modern standard configuration
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' } 
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: `Booking ${status}`, booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get all bookings for logged in user (student or tutor)
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const role = req.user.role;
    
    const query = role === 'tutor' 
      ? { tutor: req.user.userId } 
      : { student: req.user.userId };

    const bookings = await Booking.find(query)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email phone') 
      .populate('request', 'title subject level deadline')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;