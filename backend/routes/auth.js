const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for generating JWT tokens
const protect = require('../middleware/authMiddleware') // Import the authentication middleware to protect routes

// Registration route

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save(); // Save the new user to the database

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//login route

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // step 1 - find the user by email.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // step 2 - compare the provided password with the hashed password in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // step 3 - generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      fullName: user.fullName
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

// Get all tutors

router.get("/tutors", protect, async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).select('-password') // Exclude the password field from the response
    res.status(200).json(tutors)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})


// Update  profile
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { bio, subjects, availability, school, level } = req.body

    const updatedUser = await User.findByIdAndUpdate( // Find the user by their ID (extracted from the JWT token by the protect middleware)
      req.user.userId,
      { bio, subjects, availability, school, level },
      { new: true } // Return the updated user document after the update is applied
    ).select('-password')

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router
