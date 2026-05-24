const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'declined', 'completed'], // Restrict status to these values
    default: 'pending' // Default status is 'pending'
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema); // Create a Mongoose model named 'Booking' based on the bookingSchema
module.exports = Booking; // Export the Booking model for use in other parts of the application