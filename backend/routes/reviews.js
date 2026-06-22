const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import clean controller methods
const { createReview, getTutorReviews } = require("../controllers/reviewController");

// Map endpoints cleanly
router.post("/", protect, createReview);
router.get("/tutor/:tutorId", getTutorReviews); // Public access so students can browse feedback

module.exports = router;