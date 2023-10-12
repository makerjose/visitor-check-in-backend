const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['security', 'department'], // Set the allowed roles
    default: 'security', // Default role will be 'security' for new users
  },
});

module.exports = mongoose.model("User", userSchema);


