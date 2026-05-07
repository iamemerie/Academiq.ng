const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true   // Ensure email is unique across users
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'helper'],   // Restrict role to either 'student' or 'helper'
    required: true
  }
}, { timestamps: true })   // Automatically add createdAt and updatedAt fields

const user = mongoose.model('User', userSchema)  // Create a Mongoose model named 'User' based on the userSchema
module.exports = user   // Export the User model for use in other parts of the application