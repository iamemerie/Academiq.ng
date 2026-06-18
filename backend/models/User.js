const mongoose = require('mongoose')

// Defining a structured sub-schema for schedule management
const availabilityWindowSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  startTime: {
    type: String, // Stored as 24-hour format string (e.g., "14:00")
    required: true
  },
  endTime: {
    type: String, // Storing as 24-hour format string (e.g., "16:00")
    required: true
  }
}, { _id: false }) // Prevents Mongoose from creating an internal _id field for every single time-slot entry

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
  
  // UPGRADED FIELD: Now holds structural time items instead of raw text strings
  availability: {
    type: [availabilityWindowSchema],
    default: [] // Clean default array instantiation
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