const express = require('express');
const router = express.Router();
const inviteController = require('./inviteController');
const middleware = require('./inviteMiddleWare');

router.get('/:id', inviteController.getInvitesByUserId);
router.get('/count', inviteController.getInvitesByUserId);
router.post('/team', inviteController.createTeamInvite);
router.post(
  '/follow',
  middleware.checkFollowType,
  middleware.checkFollowBody,
  inviteController.createFollowInvite
);
router.post('/star', inviteController.createStarredInvite);
router.post(
  '/comments',
  middleware.checkCommentType,
  middleware.checkCommentBody,
  inviteController.createCommentsInvite
);
router.delete('/:id', inviteController.deleteInviteById);
router.put('/:id', inviteController.updateInviteById);

module.exports = router;
