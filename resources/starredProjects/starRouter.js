const express = require('express');
const router = express.Router();
const starController = require('./starController');

const secured = require('../utils/secured');

router.post('/', secured, starController.createStar);
router.get('/:id', starController.getStarredByUserId);
router.post('/unstar/:id', secured, starController.deleteStar);
router.get('/count/:id', starController.getProjectStarCount);
router.get('/status/:userId/:projectId', starController.getStarStatus);

module.exports = router;
