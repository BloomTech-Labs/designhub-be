const go = require('../utils/crud');
const db = require('../../data/dbConfig');

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

exports.createCommentsInvite = async (req, res) => {
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

  if (type !== 'comment') {
    res.status(400).json({
      message:
        'To post a comment invite, the the type value needs to be comment'
    });
  }

  try {
    const [id] = await go.createOne('invite', 'id', req.body);
    const data = await go.getById('invite', id);
    res.status(201).json({ message: 'Invite successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: 'Could not create invite', error: error });
  }
};

exports.deleteInviteById = (req, res) => {};

exports.updateInviteById = (req, res) => {};
