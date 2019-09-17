const express = require('express');
const router = express.Router();
const photoController = require('./photoController');

router.post('/signed', photoController.signedUrl);

module.exports = router;
