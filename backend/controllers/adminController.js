const User = require("../models/User");
const Booking = require("../models/Booking");
const Request = require("../models/Request");

// @desc     Get total overview metrics across the whole platform
// @route    GET /api/admin/dashboard-stats
// @access   Private (Admin Only)
const getAdminStats = async (req, res) => {
  try {
    // Run counts in parallel for optimal backend speed performance
    const [totalUsers, totalTutors, totalStudents, totalBookings, totalRequests] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "tutor" }),
      User.countDocuments({ role: "student" }),
      Booking.countDocuments(),
      Request.countDocuments(),
    ]);

    res.status(200).json({
      totalUsers,
      totalTutors,
      totalStudents,
      totalBookings,
      totalRequests,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving metrics", error: error.message });
  }
};

// @desc     Get all registered accounts for tracking activity
// @route    GET /api/admin/users
// @access   Private (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    // Exclude password hashes for security
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users list", error: error.message });
  }
};

// @desc     Remove/Ban a problematic user account from the system
// @route    DELETE /api/admin/users/:id
// @access   Private (Admin Only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User target not found" });
    }
    
    res.status(200).json({ message: `Account for ${user.fullName} successfully removed.` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// @desc     Toggle Ban/Unban status of a user
// @route    PUT /api/admin/users/:id/toggle-ban
// @access   Private (Admin Only)
  const toggleUserBan = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ADD THIS LINE RIGHT HERE
    console.log("req.user contents:", req.user);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(
      id,
      { $set: { isBanned: !user.isBanned } },
      { new: true }
    );

    res.status(200).json({ 
      message: "User status updated successfully.", 
      userId: user._id, 
      isBanned: !user.isBanned 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the functions to be used in the routing files
module.exports = {
  toggleUserBan,
  getAdminStats,
  getAllUsers,
  deleteUser,
};