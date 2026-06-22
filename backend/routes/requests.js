const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import clean controller methods
const {
  createRequest,
  getMyRequests,
  getAllRequests,
} = require("../controllers/requestController");

// Map endpoints to controllers cleanly
router.post("/", protect, createRequest);
router.get("/my-requests", protect, getMyRequests);
router.get("/all", protect, getAllRequests);

module.exports = router;