const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: String,
  subject: String,
  message: String,
  verified: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    default: ''
  },
   status: {
    type: String,
    default: 'Pending'
   }
});

module.exports = mongoose.model('Complaint', complaintSchema);
