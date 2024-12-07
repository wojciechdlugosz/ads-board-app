const mongoose = require('mongoose');

//create shema for model
const userSchema = new mongoose.Schema({
  login: { type: String, required: true},
  password: { type: String, required: true},
  avatar: { type: String, required: true },
  phone: { type: Number, required: true }
});

// Create and export model for data in user colection
module.exports = mongoose.model('User', userSchema);