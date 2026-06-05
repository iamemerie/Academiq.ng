const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware"); // Adjust name based on your auth filename

// @route   POST /api/reviews
// @desc    Create a review for a completed/accepted session
router.post("/", protect, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // 1. Verify the booking exists and belongs to this student
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.student.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to review this session" });
    }

    // 2. Create the review
    const review = await Review.create({
      booking: bookingId,
      student: req.user.userId,
      tutor: booking.tutor,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted successfully!", review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already reviewed this session" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/reviews/tutor/:tutorId
// @desc    Get all reviews for a specific tutor
router.get("/tutor/:tutorId", async (req, res) => {
  try {
    const reviews = await Review.find({ tutor: req.params.tutorId })
      .populate("student", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;