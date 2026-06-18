const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const protect = require('../middleware/authMiddleware');

// @route    POST /api/bookings
// @desc     Create a new booking request link (Student Books Tutor Slot)
router.post('/', protect, async (req, res) => {
  try {
    // UPDATED: Now accepting the new structured session scheduling properties
    const { tutorId, requestId, subject, sessionDate, timeSlot } = req.body;

    if (!tutorId || !requestId || !subject || !sessionDate || !timeSlot) {
      return res.status(400).json({ 
        message: 'Missing required fields. Ensure tutorId, requestId, subject, sessionDate, and timeSlot are provided.' 
      });
    }

    // Explicitly mapping payload properties to your upgraded schema definitions
    const newBooking = new Booking({
      student: req.user.userId, // Pulled straight from token via auth middleware
      tutor: tutorId,
      request: requestId,
      subject,
      sessionDate,
      timeSlot,
      status: 'pending' // Defaults to pending so tutor can accept/decline
    });

    await newBooking.save();

    // Fetch populate data immediately so response array mirrors your GET endpoint structures
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email')
      .populate('request', 'title subject level deadline');

    res.status(201).json({ message: 'Booking request sent successfully!', booking: populatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating booking instance', error: error.message });
  }
});

// @route    PUT /api/bookings/:id/status
// @desc     Tutor accepts or declines a booking
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    // 1. Find the booking target first to verify permissions
    const checkBooking = await Booking.findById(req.params.id);
    
    if (!checkBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // SECURITY CHECK: Ensure the logged-in user is actually the tutor assigned to this session
    if (checkBooking.tutor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized. Only the assigned tutor can update this request.' });
    }

    // 2. Perform the update safely
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' } 
    )
    .populate('student', 'fullName email')
    .populate('tutor', 'fullName email');

    res.status(200).json({ message: `Booking status changed to ${status}`, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route    GET /api/bookings/my-sessions
// @desc     Get all bookings for logged in user (student or tutor) - Aligned with Frontend
router.get('/my-sessions', protect, async (req, res) => {
  try {
    const role = req.user.role;
    
    const query = role === 'tutor' 
      ? { tutor: req.user.userId } 
      : { student: req.user.userId };

    const bookings = await Booking.find(query)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email') 
      .populate('request', 'title subject level deadline')
      .sort({ sessionDate: 1 }); // Sorted with soonest sessions appearing at the top

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;