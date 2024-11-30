const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	login: { type: String, required: true },
	password: { type: String, required: true },
	phone: { type: Number, required: true },
	avatar: { type: String, required: true },
})

module.exports = mongoose.model('User', userSchema)