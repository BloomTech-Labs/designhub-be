const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createStar = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }
  if (!req.body.projectId) {
    res
      .status(400)
      .json({ message: 'projectId was not attached to the req.body' });
  }

  try {
    const [id] = await go.createOne('starred_project', 'id', req.body);
    const data = await go.getById('starred_project', id);
    res
      .status(201)
      .json({ message: 'Starring a project successfully created!', data });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Could not add a star project', error: error });
  }
};

exports.deleteStar = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }

  if (!req.params.projectId) {
    res
      .status(400)
      .json({ message: 'projectId was not attached to the req.params' });
  }

  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    await db('starred_projects')
      .del()
      .where('projectId', projectId)
      .andWhere('userId', userId);
    res.status(200).json({ message: 'Star successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't delete star.", error: error });
  }
};
