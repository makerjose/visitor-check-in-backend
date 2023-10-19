const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
  },
  department: {  
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
    timezone: 'Africa/Nairobi', 
  },  
  checkOutTime: {
    type: Date,
    default: null, 
  },
  unitToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);
