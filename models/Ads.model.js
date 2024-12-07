const mongoose = require('mongoose');

//create shema for model
const adsSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: { type: Date, required: true },
  picture: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: String, required: true, ref: 'User'  }
});

// Create and export model for data in ads colection
module.exports = mongoose.model('Ads', adsSchema);