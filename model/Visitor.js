const mongoose = require("mongoose");
const cryptoRandomString = require("crypto-random-string");

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
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
  },
  checkOutTime: {
    type: Date,
    default: "",
  },
  unitToken: {
    type: String,
    default: () => cryptoRandomString({ length: 10, type: 'alphanumeric' }), // to generate a random 10-character token
    unique: true,
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);
