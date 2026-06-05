const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model to interact with the users collection in MongoDB
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for generating JWT tokens
const protect = require('../middleware/authMiddleware') // Import the authentication middleware to protect routes
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// ==========================================
// 1. Registration Route
// ==========================================
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

// ==========================================
// 2. Standard Login Route
// ==========================================
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
});

// ==========================================
// 3. Google OAuth Route (Now properly separated!)
// ==========================================
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const { name, email, picture } = ticket.getPayload()

    // Check if user already exists
    let user = await User.findOne({ email })

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        fullName: name,
        email,
        password: 'google-auth', 
        role: 'student' // default role
      })
      await user.save()
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      role: user.role,
      fullName: user.fullName
    })

  } catch (error) {
    res.status(401).json({ message: 'Google authentication failed', error })
  }
})

// ==========================================
// 4. Get All Tutors Route
// ==========================================
router.get("/tutors", protect, async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).select('-password') // Exclude the password field from the response
    res.status(200).json(tutors)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// ==========================================
// 5. Update Profile Route
// ==========================================
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { bio, subjects, availability, school, level } = req.body

    const updatedUser = await User.findByIdAndUpdate( // Find the user by their ID
      req.user.userId,
      { bio, subjects, availability, school, level },
      { new: true } // Return the updated user document
    ).select('-password')

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router;