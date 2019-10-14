const express = require('express');
const router = express.Router();
const exploreController = require('./exploreController');

router.get('/explore', exploreController.getExploreOptions);

module.exports = router;
