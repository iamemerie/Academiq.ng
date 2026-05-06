const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    })

    await newUser.save()

    res.status(201).json({ message: 'Account created successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router