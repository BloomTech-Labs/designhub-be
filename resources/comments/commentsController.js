// ********************* PHOTO COMMENTS *************************
//***************************************************************

exports.createPhotoComment = async (req, res) => {
  if (!req.body.imageId) {
    res
      .status(400)
      .json({ message: 'imageId was not attached to the req.body' });
  } else if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'text was not attached to the req.body' });
  }

  try {
    const [id] = await go.createOne('comments', 'id', req.body);
    const data = await go.getById('comments', id);
    res.status(201).json({ message: 'Comment successfully created!', data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't create comment", error: error });
  }
};

// ********************* PROJECT COMMENTS *************************
// ****************************************************************
