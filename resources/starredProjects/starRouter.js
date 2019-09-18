const express = require('express');
const router = express.Router();
const starController = require('./starController');

router.post('/', starController.createStar);
router.post('/delete/:projectId', starController.deleteStar);
router.get('/count/:projectId', starController.getProjectStarCount);

module.exports = router;
