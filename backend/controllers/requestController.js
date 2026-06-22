const Request = require("../models/Request");

// @desc     Post a new study help request
// @route    POST /api/requests
// @access   Private (Student Only)
const createRequest = async (req, res) => {
  try {
    const { title, subject, description, deadline, level } = req.body;
    
    // ✅ Safe extraction using our standard fallback strategy
    const studentId = req.user.userId || req.user.id || req.user._id;

    if (!studentId) {
      return res.status(401).json({ message: "Authentication failure. Missing User ID context." });
    }

    const newRequest = new Request({
      title,
      subject,
      description,
      deadline,
      level,
      student: studentId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request created successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error creating request", error: error.message });
  }
};

// @desc     Get all requests submitted by the logged-in student
// @route    GET /api/requests/my-requests
// @access   Private (Student Only)
const getMyRequests = async (req, res) => {
  try {
    const studentId = req.user.userId || req.user.id || req.user._id;

    const requests = await Request.find({ student: studentId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching your requests", error: error.message });
  }
};

// @desc     Get all open requests for tutors to browse
// @route    GET /api/requests/all
// @access   Private (Tutor Only)
const getAllRequests = async (req, res) => {
  try {
    // Finds all open entries, populates student metadata, and sorts by newest first
    const requests = await Request.find({ status: "open" })
      .populate("student", "fullName email bio school level")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error pulling request feed", error: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getAllRequests,
};