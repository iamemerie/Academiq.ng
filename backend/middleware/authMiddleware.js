const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]  // Extract the token from the Authorization header (format: "Bearer

  if (!token) { // If no token is provided, return an unauthorized response
    return res.status(401).json({ message: 'No token, access denied' })
  }

  try { // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next() // If token is valid, attach the decoded user information to the request object and proceed to the next middleware or route handler
  } catch (error) { // If token verification fails, return an unauthorized response
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = protect;