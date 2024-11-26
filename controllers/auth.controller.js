const User = require('../models/Users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const escape = require('../utils/escapeFunction');

// register new User
exports.register = async (req, res) => {
	try {
		let { login, password, phone } = req.body;
		phone = Number(phone);
		login = escape(login);
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn';
		const avatar = req.file.filename;

		if (
			login &&
			password &&
			avatar &&
			phone &&
			typeof login === 'string' &&
			typeof password === 'string' &&
			['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
			typeof phone === 'number' &&
			req.file.size <= 1048576
		) {
			const userWithLogin = await User.findOne({ login });
			if (userWithLogin) {

				// delete photo from uploads folder
				const path = `public/uploads/${avatar}`;
				fs.unlinkSync(path);
				res.status(409).send({ error: 'UserCoflict', message: 'User already exists' });
				return
			}
			const newUser = new User({ login, password: await bcrypt.hash(password, 10), avatar, phone });
			await newUser.save();
			res.status(201).send({ message: 'User created: ' + newUser.login });
		} else res.status(400).send({ error: 'Bad request', message: 'Invalid request' });
	} catch (err) {
		res.status(500).json({error: 'ServerError', message: err.message });
	}
}
// login User
exports.login = async (req, res) => {
	try {
		const { login, password } = req.body;
		if (login && password && typeof login === 'string' && typeof password === 'string') {
			const user = await User.findOne({ login });
			if (!user) {
				return res.status(400).send({ error: 'InvalidCredentials', message: 'Login or password incorrect' });
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					req.session.login = user.login;
					res.status(200).send({ success: true, message: 'Login successful' });
				} else {
					res.status(400).send({ error: 'InvalidCredentials', message: 'Login or password is incorrect' });
				}
			};
		} else {
			res.status(400).send({ error: 'BadRequest', message: 'Invalid request' })
		}
	} catch (err) {
		res.status(500).send({ error: 'ServerError',  message: err.message });
	}
};

// get all logged users
exports.getLoggedUser = async (req, res) => {
	try {
		const user = await Users.find();
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: 'ServerError',  message: err.message });
	}
};

// logout user
exports.logout = async (req, res) => {
	try {
		await req.session.destroy();
		res.status(200).json({ success: true, message: 'You have been successfully logged out' });
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message });
	}
};