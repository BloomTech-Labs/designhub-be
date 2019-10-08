const express = require('express');
const router = express.Router();
const inviteController = require('./inviteController');

router.get('/:id', inviteController.getInvitesByUserId);
router.get('/count', inviteController.getInvitesByUserId);
router.post('/team', inviteController.createTeamInvite);
router.post('/follow', inviteController.createFollowInvite);
router.post('/star', inviteController.createStarredInvite);
router.post('/comments', inviteController.createCommentsInvite);
router.delete('/:id', inviteController.deleteInviteById);
router.put('/:id', inviteController.updateInviteById);

module.exports = router;
