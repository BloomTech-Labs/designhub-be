const express = require('express');
const router = express.Router();
const photoController = require('./photoController');

router.post('/signed', photoController.signedUrl);
router.get('/:id', photoController.getPhotosByProjectId);

module.exports = router;
