const Ads = require('../models/Ads.model.js');
const getImageFileType = require('../utils/getImageFileType');
const escape = require('../utils/espaceFunc');
const fs = require('fs');
const validateAds = require('../utils/validateAds');

// Load all ads
exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find().populate('user'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Find one ad by id
exports.getOne = async (req, res) => {
  try {
    const searchAds = await Ads.findById(req.params.id).populate('user');
    if(!searchAds) res.status(404).json({ message: 'Not found' });
    else res.json(searchAds);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Add one new Ad
exports.postOne = async (req, res) => {
  
  try {
    let { title, content, date, price, location, user } = req.body;
    
    title = escape(title);
		content = escape(content);
		price = Number(price)
		location = escape(location);
		let picture = req.file.filename;
		let fileType = req.file ? await getImageFileType(req.file) : 'unknokwn'
    
    if (validateAds(title, content, date, location, user, price, fileType)) {
			{
				const newAds = new Ads({ 
          title: title, 
          content: content, 
          date: date, 
          picture: picture, 
          price: price, 
          location: location, 
          user: user });

        await newAds.save();
        res.send( newAds );
			}
		} else {
      // delete photo from uploads folder
			const path = `public/uploads/${picture}`
			fs.unlinkSync(path)
      res.status(500).json('validation failed')
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

// Edit one Ad by id
exports.putOne = async (req, res) => {
  try {
    let { title, content, date, price, location, user } = req.body;
    title = escape(title);
		content = escape(content);
		location = escape(location);

    let uploadData = { title, content, date, price, location, user }

		const wasFileUplaoded = req.file ? true : false

		if (wasFileUplaoded) {
			uploadData = { ...uploadData, picture: req.file.filename }
		}
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown'
		const id = req.params.id
		const ad = await Ads.findById(id).populate('user')
		// Delete the old image
		if (wasFileUplaoded) {
			const path = `public/uploads/${ad.picture}`
			fs.unlinkSync(path)
		}
		// change ad if data validated
		if (ad && validateAds(title, content, date, location, user, price, fileType)) {
			await ad.updateOne({ $set: { ...uploadData } })
			res.send({ message: 'Ad changed' })
		} else res.status(500).json('validation failed')
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Delete one Ad by id
exports.deleteOne = async (req, res) => {
  try {
    const delAds = await Ads.findById(req.params.id);
    if(delAds) {
      await Ads.deleteOne({ _id: req.params.id });
      // delete photo
			const path = `public/uploads/${delAds.picture}`
			fs.unlinkSync(path)
			res.json({ message: 'OK' })
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// Find Ad by search phase
exports.searchAll = async (req, res) => {
  try {
    const searchPhase = req.params.searchPhrase;

    const searchAds = await Ads.find({
			$or: [
				{ title: { $regex: searchPhase, $options: 'i' } },
				{ content: { $regex: searchPhase, $options: 'i' } },
				{ location: { $regex: searchPhase, $options: 'i' } },
			],
		}).populate('user')
    
    if(!searchAds) res.status(404).json({ message: 'Not found' });
    else res.json(searchAds);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};