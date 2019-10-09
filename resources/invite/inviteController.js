const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const errorHelper = (res, condition, item) => {
  if (!condition) {
    res
      .status(400)
      .json({ message: `${item} was not attatched to the req.body` });
  }
};

const typeCheckHelper = (res, type, check) => {
  if (type !== check) {
    res.status(400).json({
      message: `To post a ${check} invite, the the type value needs to be ${check}`
    });
  }
};

exports.getInvitesByUserId = (req, res) => {};

exports.getInviteCountByUserId = (req, res) => {};

exports.createTeamInvite = async (req, res) => {
  const {
    username,
    type,
    invitedUserId,
    activeUserId,
    mainImgUrl,
    teamId,
    activeUserAvatar
  } = req.body;
  errorHelper(res, username, 'username');
  errorHelper(res, invitedUserId, 'invitedUserId');
  errorHelper(res, activeUserId, 'activeUserId');
  errorHelper(res, mainImgUrl, 'mainImgUrl');
  errorHelper(res, activeUserAvatar, 'activeUserAvatar');
  errorHelper(res, teamId, 'teamId');
  typeCheckHelper(res, type, 'team');

  try {
    const [id] = await go.createOne('invite', 'id', req.body);
    const data = await go.getById('invite', id);
    res
      .status(201)
      .json({ message: 'Team invite successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: 'Could not create invite', error: error });
  }
};

exports.createFollowInvite = async (req, res) => {
  const {
    username,
    type,
    invitedUserId,
    activeUserId,
    mainImgUrl,
    followersId,
    activeUserAvatar
  } = req.body;
  errorHelper(res, username, 'username');
  errorHelper(res, invitedUserId, 'invitedUserId');
  errorHelper(res, activeUserId, 'activeUserId');
  errorHelper(res, mainImgUrl, 'mainImgUrl');
  errorHelper(res, activeUserAvatar, 'activeUserAvatar');
  errorHelper(res, followersId, 'followersId');
  typeCheckHelper(res, type, 'follow');

  try {
    const [id] = await go.createOne('invite', 'id', req.body);
    const data = await go.getById('invite', id);
    res
      .status(201)
      .json({ message: 'Follow invite successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: 'Could not create invite', error: error });
  }
};

exports.createStarredInvite = (req, res) => {
  const {
    username,
    type,
    invitedUserId,
    activeUserId,
    mainImgUrl,
    projectId,
    starredProjectsId,
    projectName,
    activeUserAvatar
  } = req.body;
  errorHelper(res, username, 'username');
  errorHelper(res, invitedUserId, 'invitedUserId');
  errorHelper(res, activeUserId, 'activeUserId');
  errorHelper(res, mainImgUrl, 'mainImgUrl');
  errorHelper(res, activeUserAvatar, 'activeUserAvatar');
  errorHelper(res, projectId, 'projectId');
  errorHelper(res, starredProjectsId, 'starredProjectsId');
  errorHelper(res, projectName, 'projectName');
  typeCheckHelper(res, type, 'star');
};

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
  typeCheckHelper(res, type, 'comment');

  try {
    const [id] = await go.createOne('invite', 'id', req.body);
    const data = await go.getById('invite', id);
    res
      .status(201)
      .json({ message: 'Comments invite successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: 'Could not create invite', error: error });
  }
};

exports.deleteInviteById = (req, res) => {};

exports.updateInviteById = (req, res) => {};
