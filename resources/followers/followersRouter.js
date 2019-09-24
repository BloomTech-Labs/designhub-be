const express = require('express');
const router = express.Router();
const followersController = require('./followersController');

// test
// router.get('/', followersController.getAllFollowers);

router.post('/', followersController.createFollow);
router.get('/following/:id', followersController.getFollowingByFollowingId);
router.get('/count/following/:id', followersController.getFollowingCount);
// router.get('/count/followers/:id', followersController.getFollowersByUserId);
router.get('/count/followers/:id', followersController.getFollowersCount);
router.post('/unfollow/:id', followersController.unfollow);

module.exports = router;
