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
  // ADDED: The specific topic or lesson focus being taught
  subject: {
    type: String,
    required: true
  },
  // ADDED: Exact calendar date for the scheduled meeting
  sessionDate: {
    type: Date,
    required: true
  },
  // ADDED: Clear window interval matching the tutor's availability schema layout (e.g., "14:00 - 16:00")
  timeSlot: {
    type: String,
    required: true
  },
  // ADDED: The secure virtual classroom link (Google Meet, Zoom, or your custom video path)
  meetingLink: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'declined', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true }); 

const Booking = mongoose.model('Booking', bookingSchema); 
module.exports = Booking;