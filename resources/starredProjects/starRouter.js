const express = require('express');
const router = express.Router();
const starController = require('./starController');

router.post('/', starController.createStar);
router.post('/delete/:projectId', starController.deleteStar);

module.exports = router;
