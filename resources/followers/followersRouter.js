const express = require('express');
const router = express.Router();
const followersController = require('./followersController');

// test
router.get('/', followersController.getAllFollowers);

router.post('/', followersController.createFollow);
router.get(
  '/count/following/:followingId',
  followersController.getFollowingCount
);
router.get(
  '/count/followers/:followingId',
  followersController.getFollowersCount
);
router.post('/unfollow/:followedId', followersController.unfollow);

module.exports = router;
