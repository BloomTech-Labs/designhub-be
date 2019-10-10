exports.checkCommentType = (req, res, next) => {
  if (req.body.type !== 'comment') {
    return res.status(400).json({
      message: `To post a comment invite, the the type value needs to be comment`
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
    activeUserAvatar
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
