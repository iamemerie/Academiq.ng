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
    enum: ['student', 'tutor'],   // Restrict role to either 'student' or 'tutor'
    required: true
  },
  bio: {
    type: String,
    default: ''   // Optional field for user biography, defaults to an empty string
  },
  subjects: {
    type: [String],   // Array of strings to store subjects the user is interested in or can tutor
    default: []   // Default to an empty array if no subjects are provided
  },
  isOnline: {
    type: Boolean,
    default: false   // Track whether the user is currently online, defaults to false
  },
  availability: {
    type: [String],   // Array of strings to represent the user's availability (e.g., "Monday 9-11am")
    default: ""
  },
  school: {
    type: String,
    default: ""   // Optional field for the user's school, defaults to an empty string
  },
  level: {
    type: String,
    default: ""   // Optional field for the user's academic level, defaults to an empty string
  }
}, { timestamps: true })   // Automatically add createdAt and updatedAt fields

const user = mongoose.model('User', userSchema)  // Create a Mongoose model named 'User' based on the userSchema
module.exports = user   // Export the User model for use in other parts of the application