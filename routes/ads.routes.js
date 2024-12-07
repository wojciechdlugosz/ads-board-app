const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const AdsController = require('../controllers/ads.controller.js');
const imageUpload = require('../utils/imageUpload')

router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getOne);

router.post('/ads', authMiddleware, imageUpload.single('picture'), AdsController.postOne);

router.delete('/ads/:id', authMiddleware, AdsController.deleteOne);

router.put('/ads/:id', authMiddleware, imageUpload.single('picture'), AdsController.putOne);

router.get('/ads/search/:searchPhrase', AdsController.searchAll);

module.exports = router;