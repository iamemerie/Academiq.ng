const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  level: {
    type: String,
    enum: ['100', '200', '300', '400', '500', 'JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],  // Restrict level to specific values
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in progress', 'closed'],  // Restrict status to specific values
    default: 'open'  // Default status is 'open'
  }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields  
const Request = mongoose.model('Request', requestSchema);  // Create a Mongoose model named 'Request' based on the requestSchema
module.exports = Request;  // Export the Request model for use in other parts of the application