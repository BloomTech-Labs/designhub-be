const express = require('express');
const router = express.Router();
const starController = require('./starController');

router.post('/', starController.createStar);
router.post('/unstar/:id', starController.deleteStar);
router.get('/count/:id', starController.getProjectStarCount);

module.exports = router;
