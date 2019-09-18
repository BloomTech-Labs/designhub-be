const express = require('express');
const router = express.Router();
const followersController = require('./followersController');

// test
router.get('/', followersController.getAllFollowers);

router.post('/', followersController.createFollow);
router.get('/following/:userId', followersController.getFollowingCount);
router.get('/followers/:userId', followersController.getFollowersCount);
router.post('/unfollow/:followerId', followersController.unfollow);

module.exports = router;
