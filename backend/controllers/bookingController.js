const Booking = require("../models/Booking");

// @desc     Create a new booking request link (Student Books Tutor Slot)
// @route    POST /api/bookings
// @access   Private
const createBooking = async (req, res) => {
  try {
    const { tutorId, requestId, subject, sessionDate, timeSlot } = req.body;

    if (!tutorId || !requestId || !subject || !sessionDate || !timeSlot) {
      return res.status(400).json({ 
        message: 'Missing required fields. Ensure tutorId, requestId, subject, sessionDate, and timeSlot are provided.' 
      });
    }

    const activeStudentId = req.user.userId || req.user.id || req.user._id;

    if (!activeStudentId) {
      return res.status(401).json({ 
        message: 'Authentication context failed. Student ID could not be resolved from token.' 
      });
    }

    const newBooking = new Booking({
      student: activeStudentId,
      tutor: tutorId,
      request: requestId,
      subject,
      sessionDate,
      timeSlot,
      status: 'pending'
    });

    await newBooking.save();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email')
      .populate('request', 'title subject level deadline');

    res.status(201).json({ message: 'Booking request sent successfully!', booking: populatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating booking instance', error: error.message });
  }
};

// @desc     Get all bookings for logged-in user (student or tutor)
// @route    GET /api/bookings/my-bookings
// @access   Private
const getMyBookings = async (req, res) => {
  try {
    const role = req.user.role;
    const activeUserId = req.user.userId || req.user.id || req.user._id;

    if (!activeUserId) {
      return res.status(401).json({ message: "User ID missing from authentication token" });
    }
    
    const query = role === 'tutor' 
      ? { tutor: activeUserId } 
      : { student: activeUserId };

    const bookings = await Booking.find(query)
      .populate('student', 'fullName email')
      .populate('tutor', 'fullName email') 
      .populate('request', 'title subject level deadline')
      .sort({ sessionDate: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings', error: error.message });
  }
};

// @desc     Tutor accepts or declines a booking
// @route    PUT /api/bookings/:id/status
// @access   Private (Tutor Only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const activeUserId = req.user.userId || req.user.id || req.user._id;
    
    const checkBooking = await Booking.findById(req.params.id);
    
    if (!checkBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Security check context matching logic
    if (checkBooking.tutor.toString() !== activeUserId) {
      return res.status(403).json({ message: 'Not authorized. Only the assigned tutor can update this request.' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' } 
    )
    .populate('student', 'fullName email')
    .populate('tutor', 'fullName email');

    res.status(200).json({ message: `Booking status changed to ${status}`, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating status', error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus
};