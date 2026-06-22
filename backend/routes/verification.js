const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// @desc     Tutor uploads verification document
// @route    POST /api/verification/upload
// @access   Private (Tutor only)
router.post("/upload", protect, upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No document uploaded" });
    }

    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      verificationDocument: req.file.path, // Cloudinary URL
      verificationStatus: "pending",
    });

    res.status(200).json({
      message: "Document uploaded successfully. Awaiting admin review.",
      documentUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Temporary test route — remove after testing
router.post("/test-upload", upload.single("document"), (req, res) => {
  console.log("File received:", req.file);
  console.log("Body received:", req.body);
  
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }
  
  res.status(200).json({ 
    message: "File received successfully",
    file: req.file 
  });
});


// Temporary direct cloudinary test
router.get("/test-cloudinary", async (req, res) => {
  try {
    // Test if cloudinary credentials work by fetching account info
    const result = await cloudinary.api.ping();
    res.status(200).json({ message: "Cloudinary connected!", result });
  } catch (error) {
    res.status(500).json({ message: "Cloudinary failed", error: error.message });
  }
});

module.exports = router;