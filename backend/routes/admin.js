const express = require("express");
const router = express.Router();

// ONE clean import with everything
const { getAdminStats, getAllUsers, deleteUser, toggleUserBan } = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

router.get("/dashboard-stats", protect, adminProtect, getAdminStats);
router.get("/users", protect, adminProtect, getAllUsers);
router.delete("/users/:id", protect, adminProtect, deleteUser);
router.put("/users/:id/toggle-ban", protect, adminProtect, toggleUserBan);

module.exports = router;