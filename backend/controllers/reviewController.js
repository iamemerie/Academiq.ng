const Review = require("../models/Review");
const Booking = require("../models/Booking");

// @desc     Create a review for a completed/accepted session
// @route    POST /api/reviews
// @access   Private (Student Only)
const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const activeStudentId = req.user.userId || req.user.id || req.user._id;

    if (!activeStudentId) {
      return res.status(401).json({ message: "Authentication failure. Missing Student ID context." });
    }

    // 1. Verify the booking exists and belongs to this student
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.student.toString() !== activeStudentId) {
      return res.status(403).json({ message: "Not authorized to review this session" });
    }

    // 2. Create the review
    const review = await Review.create({
      booking: bookingId,
      student: activeStudentId,
      tutor: booking.tutor,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted successfully!", review });
  } catch (error) {
    // Catch duplicate review index errors (e.g., trying to review the same booking twice)
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already reviewed this session" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc     Get all reviews for a specific tutor
// @route    GET /api/reviews/tutor/:tutorId
// @access   Public
const getTutorReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tutor: req.params.tutorId })
      .populate("student", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching tutor reviews", error: error.message });
  }
};

module.exports = {
  createReview,
  getTutorReviews,
};