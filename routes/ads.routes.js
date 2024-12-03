const express = require('express');
const router = express.Router();

const ads = require('../controllers/ads.controller');
const authMiddlware = require('../utils/authMiddlware');
const imageUpload = require('../utils/imageUploads');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getOne);
router.get('/ads/search/:searchPhrase', ads.searchAll);
router.post('/ads', authMiddlware, imageUpload.single('picture'), ads.postOne);
router.delete('/ads/:id', authMiddlware, ads.deleteOne);
router.put('/ads/:id', authMiddlware, imageUpload.single('picture'), ads.putOne);

module.exports = router;