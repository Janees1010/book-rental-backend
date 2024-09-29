const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Unique identifier for each user
  name: { type: String, required: true }, // User's full name
  email: { type: String, required: true, unique: true }, // User's email address
  password: { type: String, required: true }, // Hashed password
  createdAt: { type: Date, default: Date.now } // Timestamp when user was created
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
  