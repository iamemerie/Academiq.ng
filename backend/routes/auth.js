const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import the clean controller functions
const {
  registerUser,
  loginUser,
  googleLogin,
  getTutors,
  updateProfile,
} = require("../controllers/authController");

// Define routes cleanly
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.get("/tutors", protect, getTutors);
router.put("/update-profile", protect, updateProfile);

module.exports = router;