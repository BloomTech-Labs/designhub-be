const express = require('express');
const router = express.Router();
const exploreController = require('./exploreController');

router.get('/', exploreController.getExploreOptions);

module.exports = router;
