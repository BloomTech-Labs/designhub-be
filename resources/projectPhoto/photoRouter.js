const express = require('express');
const router = express.Router();
const photoController = require('./photoController');

router.post('/signed', photoController.signedUrl);
// router.get('/', photoController.getAllPhotos);
router.get('/:id', photoController.getPhotosByProjectId);
router.get('/one/:id', photoController.getPhotoById);
router.post('/', photoController.createProjectPhoto);
router.post('/delete', photoController.deletePhotoById);

module.exports = router;
