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
    const [id] = await go.createOne('starred_projects', 'id', req.body);
    const data = await go.getById('starred_projects', id);
    res
      .status(201)
      .json({ message: 'Starring a project successfully created!', data });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Could not add a star project', error: error });
  }
};

exports.getStarredByUserId = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  try {
    const data = await db('starred_projects as sp')
      .select(
        'sp.id as id',
        'up.name as name',
        'up.mainImg as img',
        'sp.projectId'
      )
      .where('sp.userId', req.params.id)
      .innerJoin('user_projects as up', 'sp.projectId', '=', 'up.id');
    res.status(200).json(data);
  } catch ({ message }) {
    console.error(message);
    res.status(400).json({ message: 'Couldnt find star count', message });
  }
};

exports.getProjectStarCount = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  try {
    const data = await db('starred_projects')
      .count('id')
      .where('userId', req.params.id);
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find star count' });
  }
};

exports.deleteStar = async (req, res) => {
  if (!req.body.id) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }

  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'projectId was not attached to the req.params' });
  }

  try {
    await db('starred_projects')
      .del()
      .where('projectId', req.params.id)
      .andWhere('userId', req.body.id);
    res.status(200).json({ message: 'Star successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't delete star.", error: error });
  }
};
