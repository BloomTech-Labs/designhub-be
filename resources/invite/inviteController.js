const errorHelper = (res, condition, item) => {
  if (!condition) {
    res
      .status(400)
      .json({ message: `${item} was not attatched to the req.body` });
  }
};

exports.getInvitesByUserId = (req, res) => {};

exports.getInviteCountByUserId = (req, res) => {};

exports.createTeamInvite = (req, res) => {};

exports.createFollowInvite = (req, res) => {};

exports.createStarredInvite = (req, res) => {};

exports.createCommentsInvite = (req, res) => {
  const {
    username,
    commentText,
    type,
    projectId,
    invitedUserId,
    activeUserId,
    mainImgUrl,
    commentsId,
    activeUserAvatar
  } = req.body;
  errorHelper(res, username, 'username');
  errorHelper(res, commentText, 'commentText');
  errorHelper(res, projectId, 'projectId');
  errorHelper(res, invitedUserId, 'invitedUserId');
  errorHelper(res, activeUserId, 'activeUserId');
  errorHelper(res, mainImgUrl, 'mainImgUrl');
  errorHelper(res, commentsId, 'commentsId');
  errorHelper(res, activeUserAvatar, 'activeUserAvatar');
};

exports.deleteInviteById = (req, res) => {};

exports.updateInviteById = (req, res) => {};
