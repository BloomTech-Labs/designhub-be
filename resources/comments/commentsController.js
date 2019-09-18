const go = require('../utils/crud');
const db = require('../../data/dbConfig');

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
  } else if (!req.body.username) {
    res
      .status(400)
      .json({ message: 'username was not attached to the req.body' });
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

exports.getCommentsByImageId = async (req, res) => {
  if (!req.params.imageId) {
    res
      .status(400)
      .json({ message: 'imageId was not attached to the req.params' });
  }
  const { imageId } = req.params.imageId;
  try {
    const data = await db('comments')
      .select('*')
      .where('imageId', imageId);
    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the photo's comments", error: error });
  }
};

// ********************* PROJECT COMMENTS *************************
// ****************************************************************

exports.createProjectComment = async (req, res) => {
  if (!req.body.projectId) {
    res
      .status(400)
      .json({ message: 'projectId was not attached to the req.body' });
  } else if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'text was not attached to the req.body' });
  } else if (!req.body.username) {
    res
      .status(400)
      .json({ message: 'username was not attached to the req.body' });
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

exports.getCommentsByProjectId = async (req, res) => {
  if (!req.params.projectId) {
    res
      .status(400)
      .json({ message: 'projectId was not attached to the req.params' });
  }

  const { projectId } = req.params.projectId;
  try {
    const data = await db('comments')
      .select('*')
      .where('projectId', projectId);
    res.status(200).json({ data });
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the project's comments", error: error });
  }
};

// ************************ SHARED ***********************************//
//****************************************************************** */

exports.updateCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('comments', req.body, id);
    const data = await go.getById('comments', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't update comment.", error: error });
  }
};

exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.destroyById('comments', id);
    res.status(200).json({ message: 'Comment successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete comment.", error: error });
  }
};
