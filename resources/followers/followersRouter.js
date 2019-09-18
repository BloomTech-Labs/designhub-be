const express = require('express');
const router = express.Router();
const followersController = require('./followersController');

// test
// router.get('/', followersController.getAllFollowers);

router.post('/', followersController.createFollow);

module.exports = router;
