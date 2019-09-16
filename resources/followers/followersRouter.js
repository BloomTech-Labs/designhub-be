const express = require('express');
const router = express.Router();
const followersController = require('./followersController');

router.get('/', followersController.getAllFollowers);

module.exports = router;
