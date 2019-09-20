const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createProject = async (req, res) => {
  try {
    const [id] = await go.createOne('user_projects', 'id', req.body);
    const data = await go.getById('user_projects', id);
    res.status(201).json({ message: 'Project successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create project", error: error });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('user_projects', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't find project.", error: error });
  }
};

exports.getProjectByUserId = async (req, res) => {
  console.log('hrello world!');
  const { userId } = req.params;
  console.log(userId);
  try {
    const data = await go.getByUserId('user_projects', userId);
    res.status(200).json(data);
  } catch ({ message }) {
    res
      .status(400)
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
    res.status(400).json({ message: "Couldn't get projects.", error: error });
  }
};

exports.getProjectsByName = async (req, res) => {
  const term = req.body.projectName;

  try {
    const data = await db('user_projects').where(
      'projectName',
      'like',
      `%${term}%`
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't find project.", error: error });
  }
};

exports.updateProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('user_projects', req.body, id);
    const data = await go.getById('user_projects', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't update project.", error: error });
  }
};

exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.destroyById('user_projects', id);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete user.", error: error });
  }
};
