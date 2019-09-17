const express = require('express');
const router = express.Router();
const photoController = require('./photoController');

router.post('/signed', photoController.signedUrl);
router.get('/:id', photoController.getPhotosByProjectId);
router.post('/', photoController.createProjectPhoto);
router.delete('/:id', photoController.deletePhotoById);

module.exports = router;
