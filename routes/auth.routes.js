const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth.controller');
const authMiddlware = require('../utils/authMiddlware');
const imageUpload = require('../utils/imageUploads');

router.post('/register', imageUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.get('/user', authMiddlware, auth.getLoggedUser);
router.delete('/logout', authMiddlware, auth.logout);

module.exports = router;