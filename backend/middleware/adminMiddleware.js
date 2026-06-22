const adminProtect = (req, res, next) => {
  // Ensure the protect middleware ran first and attached req.user
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed!
  } else {
    return res.status(403).json({ 
      message: 'Access denied. Management authorization clearance required.' 
    });
  }
};

module.exports = adminProtect;