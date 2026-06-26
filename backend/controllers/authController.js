const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// @desc     Standard User Registration
// @route    POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role || "",
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc     Standard Password Login
// @route    POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      fullName: user.fullName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc     Google OAuth Authentication Flow
// @route    POST /api/auth/google
const googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    console.log("📥 Google login request received!");
    console.log("  Token exists:", !!token);
    console.log("  Role:", role);

    // ✅ FIXED: Use Google's tokeninfo endpoint instead of google-auth-library
    // This avoids the 403 certificate fetch error on Render free tier
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    const payload = await googleRes.json();

    if (!googleRes.ok || payload.error) {
      console.error("❌ Token verification failed:", payload);
      return res.status(401).json({ message: "Invalid Google token" });
    }

    // Verify the token was issued for our app
    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error("❌ Token audience mismatch");
      return res.status(401).json({ message: "Token audience mismatch" });
    }

    const { name, email } = payload;
    console.log("✅ Token verified!");
    console.log("  Name:", name);
    console.log("  Email:", email);

    let user = await User.findOne({ email });
    console.log("  Existing user found:", !!user);

    // Existing user — log in directly
    if (user) {
      const jwtToken = generateToken(user);
      return res.status(200).json({
        message: "Login successful",
        token: jwtToken,
        role: user.role,
        fullName: user.fullName,
      });
    }

    // New user, no role yet — ask frontend to show role picker
    if (!role) {
      return res.status(200).json({ needsRole: true, name, email });
    }

    // New user with role — create account
    console.log("Creating new user with role:", role);

    user = new User({
      fullName: name,
      email,
      password: "google-auth",
      role,
    });
    await user.save();

    const jwtToken = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token: jwtToken,
      role: user.role,
      fullName: user.fullName,
    });

  } catch (error) {
    console.error("❌ Google authentication error:", error);
    res.status(401).json({
      message: "Google authentication failed",
      error: error.message,
      details: error.stack,
    });
  }
};

// @desc     Get all registered tutors
// @route    GET /api/auth/tutors
const getTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" }).select("-password");
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc     Update Profile Fields
// @route    PUT /api/auth/update-profile
const updateProfile = async (req, res) => {
  try {
    const { bio, subjects, availability, school, level } = req.body;

    const userId = req.user.userId || req.user.id || req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio, subjects, availability, school, level },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getTutors,
  updateProfile,
};