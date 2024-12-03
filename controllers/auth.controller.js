const User = require('../models/Users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const escape = require('../utils/escapeFunction');

// register new User
exports.register = async (req, res) => {
	try{
	  const { login, password, phone } = req.body;
	  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
	  phoneNumber = Number(phone);
	  loginSec = escape(login);
	  const avatar = req.file.filename;
  
	  if(loginSec && 
		typeof loginSec === 'string' && 
		password && 
		typeof password === 'string' && 
		req.file && 
		['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && 
		typeof phoneNumber === 'number' && 
		req.file.size <= 1048576) {
	  
		const userWithLogin = await User.findOne({ loginSec });
		if (userWithLogin) {
		  // delete photo from uploads folder
				  const path = `public/uploads/${avatar}`
				  fs.unlinkSync(path)
		  return res.status(409).send({ message: 'User with this login alredy exist' });
		}
		const user = await User.create({ login: loginSec, password: await bcrypt.hash(password, 10), avatar: avatar, phone: phoneNumber });
		res.status(201).send({ message: 'User created' + user.login })
	  } else {
		// delete photo from uploads folder
			  const path = `public/uploads/${avatar}`
			  fs.unlinkSync(path)
		res.status(400).send({ message: 'Bad request'});
	  }
  
	} catch (err) {
	  res.status(500).send({ message: err.message });
	}
  };
  
  exports.login = async (req, res) => {
	try{
	  const { login, password} = req.body;
  
	  if(login && typeof login === 'string' && password && typeof password === 'string') {
		const user = await User.findOne({ login });
  
		if (!user) {
		  return res.status(400).send({ message: 'User or password are incorrect' });
		} else {
		  if (bcrypt.compareSync(password, user.password)) {
			const userLogged = { login: user.login, id: user._id, avatar: user.avatar};
			req.session.user = userLogged;
			
			res.status(200).json( req.session.user );
  
			console.log('Hello ' + req.session.user.login + ' you are logged in.')
		  } else {
			res.status(401).send({ message: 'User or password are incorrect' });
		  }
		}
  
	  } else {
		res.status(400).send({ message: 'Bad request'});
	  }
  
	} catch (err) {
	  res.status(500).send({ message: err.message });
	}
  };
  
  exports.getUser = async (req, res) => {
	  res.json({ message: 'You are login', user: req.session });
  };
  
  exports.logout = async (req, res) => {
	req.session.destroy;
	res.send({ message: 'You are logout' });
  };