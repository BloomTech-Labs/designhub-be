const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createProject = async (req, res) => {
  const { userId, name } = req.body;
  if (!userId || !name) {
    res.status(422).json({ message: 'Missing fields' });
  } else {
    try {
      const [id] = await go.createOne('user_projects', 'id', req.body);
      const data = await go.getById('user_projects', id);
      res
        .status(201)
        .json({ message: 'Project successfully created!', data, id });
    } catch ({ message }) {
      res
        .status(500)
        .json({ message: "Couldn't create project", error: message });
    }
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db('user_projects as up')
      .select('up.*', 'u.username')
      .where('up.id', id)
      .innerJoin('users as u', 'up.userId', '=', 'u.id');
    if (data.length === 0) {
      res.status(404).json({ message: 'project not found' });
    } else {
      res.status(200).json(data);
    }
  } catch ({ message }) {
    res.status(500).json({ message: "Couldn't find project.", error: message });
  }
};

exports.getProjectByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await go
      .getByUserId('user_projects as up', userId, 'up.*', 'u.username')
      .innerJoin('users as u', 'up.userId', '=', 'u.id');
    if (data.length === 0) {
      res.status(404).json({ message: 'user id not found' });
    } else {
      res.status(200).json(data);
    }
  } catch ({ message }) {
    res
      .status(500)
      .json({ message: "Couldn't get projects by user.", error: message });
  }
};

//FOR RECENT PROJECT VIEW

exports.getRecentProjectByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await go
      .getByUserId('user_projects', userId)
      .orderBy('created_at', 'desc')
      .limit(8);
    if (data.length === 0) {
      res.status(404).json({ message: 'user id not found' });
    } else {
      res.status(200).json(data);
    }
  } catch ({ message }) {
    res
      .status(500)
      .json({ message: "Couldn't get projects by user.", error: message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const data = await db('user_projects')
      .select(
        'user_projects.id',
        'user_projects.userId',
        'u.username',
        'user_projects.private',
        'user_projects.name',
        'user_projects.description',
        'user_projects.figma',
        'user_projects.invision',
        'user_projects.mainImg',
        'user_projects.created_at',
        'user_projects.updated_at'
      )
      .orderBy('id', 'asc')
      .innerJoin('users as u', 'u.id', '=', 'user_projects.userId');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Couldn't get projects.", error: error });
  }
};

exports.getProjectsByName = async (req, res) => {
  const term = req.body.projectName;

  if (!req.body.projectName) {
    res.status(422).json({ message: 'missing fields' });
  } else {
    try {
      const data = await db('user_projects').where('name', 'like', `%${term}%`);

      if (data.length === 0) {
        res.status(404).json({ message: 'project with name not found' });
      } else {
        res.status(200).json(data);
      }
    } catch ({ message }) {
      res.status(500).json(message);
    }
  }
};

exports.updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { userId, name } = req.body;

  if (!userId || !name) {
    res.status(422).json({ message: 'missing fields' });
  } else {
    try {
      await go.updateById('user_projects', req.body, id);
      const data = await go.getById('user_projects', id);
      if (data.length === 0) {
        res.status(404).json({ message: 'project id not found' });
      } else {
        res.status(200).json(data);
      }
    } catch ({ message }) {
      res
        .status(500)
        .json({ message: "Couldn't update project.", error: message });
    }
  }
};

exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await go.destroyById('user_projects', id);
    if (deleted !== 1) {
      res.status(404).json({ message: 'user id not found' });
    } else {
      res.status(200).json({ message: 'User successfully deleted' });
    }
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete user.", error: error });
  }
};
