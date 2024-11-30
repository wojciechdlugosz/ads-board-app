const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
	_id: { type: String },
	expires: { type: Date, required: true },
	session: { type: String, required: true },
})

module.exports = mongoose.model('Session', sessionSchema)