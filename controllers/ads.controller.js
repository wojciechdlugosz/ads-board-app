const Ads = require('../models/Ads.model');
const getImageFileType = require('../utils/getImageFileType');
const validateAds = require('../utils/validateAds');
const fs = require('fs');
const escape = require('../utils/escapeFunction');

// load all ads
exports.getAll = async (req, res) => {
	try {
		const ad = await Ads.find().populate('seller');
		res.json(ad)
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message });
	}
};

// find ad by id
exports.getById = async (req, res) => {
	try {
		const ad = await Ads.findById(req.params.id).populate('seller');
		if (!ad) {
			res.status(404).json({ error: 'NotFound', message: 'Not found!' });
		} else res.json(ad);
	} catch (err) {
		res.status(500).json( {error: 'ServerError', message: err.message});
	}
};

// find ad by search phrase
exports.getBySearchPhrase = async (req, res) => {
	try {
		const searchParams = req.params.searchPhrase;
		const ads = await Ads.find({
			$or: [
				{ title: { $regex: searchParams, $options: 'i' } },
				{ text: { $regex: searchParams, $options: 'i' } },
				{ location: { $regex: searchParams, $options: 'i' } },
			],
		}).populate('seller');
		res.send(ads);
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message });
	}
};

// add new ad
exports.post = async (req, res) => {
	try {
		let { title, text, date, location, seller, price } = req.body;
		title = escape(title);
		text = escape(text);
		location = escape(location);
		price = Number(price);
		const picture = req.file.filename;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn';

		if (validateAds(title, text, date, location, user, seller, fileType)) {
			{
				const newAd = new Ads({ title, text, date, picture, location, seller, price });
				await newAd.save();
				res.send(newAd);
			}
		} else {
			const path = `public/uploads/${ad.picture}`
			fs.unlinkSync(path);
			res.status(500).json({ error: 'Validation failed', message: err.message });
		}
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message });
	}
};

// delete one ad by id
exports.delete = async (req, res) => {
	try {
		const ad = await Ads.findById(req.params.id)
		if (ad) {
			await Ads.deleteOne({ _id: req.params.id })
			res.json({ message: 'OK' })
		}
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message })
	}
}
// edit one ad by id
exports.put = async (req, res) => {
	try {
		let { title, text, date, location, seller, price } = req.body;
		title = escape(title);
		text = escape(text);
		location = escape(location);
		const picture = req.file.filename;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknokwn';

		const ad = await Ads.findById(req.params.id).populate('seller');
		console.log(ad);

		// Delete the old image
		if (req.file) {
			const path = `public/uploads/${ad.picture}`
			fs.unlinkSync(path);
		}
		if (ad && validateAds(title, text, date, location, seller, price, fileType)) {
			await ad.updateOne({ $set: { title, text, date, picture, location, seller, price } });
			res.send({ message: 'Ad updated' });
		} else {
			res.status(500).json({ error: 'Validation failed', message: err.message });
		}
	} catch (err) {
		res.status(500).json({ error: 'ServerError', message: err.message });
	}
};