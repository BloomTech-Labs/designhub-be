exports.checkCommentType = (req, res, next) => {
  console.log(req.body);
  if (req.body.type !== 'comment') {
    return res.status(400).json({
      message: `To post a comment invite, the the type value needs to be comment`,
    });
  }
  next();
};

exports.checkCommentBody = (req, res, next) => {
  const {
    activeUsername,
    commentText,
    projectId,
    invitedUserId,
    activeUserId,
    mainImgUrl,
    commentsId,
    activeUserAvatar,
  } = req.body;

  if (!activeUsername) {
    return res
      .status(400)
      .json({ message: `activeUsername was not attatched to the req.body` });
  } else if (!invitedUserId) {
    return res
      .status(400)
      .json({ message: `invitedUserId was not attatched to the req.body` });
  } else if (!activeUserId) {
    return res
      .status(400)
      .json({ message: `activeUserId was not attatched to the req.body` });
  } else if (!mainImgUrl) {
    return res
      .status(400)
      .json({ message: `mainImgUrl was not attatched to the req.body` });
  } else if (!commentText) {
    return res
      .status(400)
      .json({ message: `commentText was not attatched to the req.body` });
  } else if (!activeUserAvatar) {
    return res
      .status(400)
      .json({ message: `activeUserAvatar was not attatched to the req.body` });
  } else if (!projectId) {
    return res
      .status(400)
      .json({ message: `projectId was not attatched to the req.body` });
  } else if (!commentsId) {
    return res
      .status(400)
      .json({ message: `commentsId was not attatched to the req.body` });
  } else {
    next();
  }
};

exports.checkFollowType = (req, res, next) => {
  console.log(req.body);
  if (req.body.type !== 'follow') {
    return res.status(400).json({
      message: `To post a follow invite, the the type value needs to be follow`,
    });
  }
  next();
};

exports.checkFollowBody = (req, res, next) => {
  const {
    activeUsername,
    invitedUserId,
    activeUserId,
    followersId,
    activeUserAvatar,
  } = req.body;

  if (!activeUsername) {
    return res
      .status(400)
      .json({ message: `activeUsername was not attatched to the req.body` });
  } else if (!invitedUserId) {
    return res
      .status(400)
      .json({ message: `invitedUserId was not attatched to the req.body` });
  } else if (!activeUserId) {
    return res
      .status(400)
      .json({ message: `activeUserId was not attatched to the req.body` });
  } else if (!activeUserAvatar) {
    return res
      .status(400)
      .json({ message: `activeUserAvatar was not attatched to the req.body` });
  } else if (!followersId) {
    return res
      .status(400)
      .json({ message: `followersId was not attatched to the req.body` });
  } else {
    next();
  }
};

exports.checkStarType = (req, res, next) => {
  console.log(req.body);
  if (req.body.type !== 'star') {
    return res.status(400).json({
      message: `To post a star invite, the the type value needs to be star`,
    });
  }
  next();
};

exports.checkStarBody = (req, res, next) => {
  const {
    activeUsername,

    invitedUserId,
    activeUserId,
    mainImgUrl,
    projectId,
    starredProjectsId,
    projectName,
    activeUserAvatar,
  } = req.body;

  if (!activeUsername) {
    return res
      .status(400)
      .json({ message: `activeUsername was not attatched to the req.body` });
  } else if (!invitedUserId) {
    return res
      .status(400)
      .json({ message: `invitedUserId was not attatched to the req.body` });
  } else if (!activeUserId) {
    return res
      .status(400)
      .json({ message: `activeUserId was not attatched to the req.body` });
  } else if (!activeUserAvatar) {
    return res
      .status(400)
      .json({ message: `activeUserAvatar was not attatched to the req.body` });
  } else if (!followersId) {
    return res
      .status(400)
      .json({ message: `followersId was not attatched to the req.body` });
  } else if (!projectId) {
    return res
      .status(400)
      .json({ message: `projectId was not attatched to the req.body` });
  } else if (!mainImgUrl) {
    return res
      .status(400)
      .json({ message: `mainImgUrl was not attatched to the req.body` });
  } else if (!starredProjectsId) {
    return res
      .status(400)
      .json({ message: `starredProjectsId was not attatched to the req.body` });
  } else if (!projectName) {
    return res
      .status(400)
      .json({ message: `projectName was not attatched to the req.body` });
  } else {
    next();
  }
};
