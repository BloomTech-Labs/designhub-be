const go = require('../utils/crud');
const db = require('../../data/dbConfig');

const userMatches = require('../utils/userMatches');
const collaboratorMatches = require('../utils/collaboratorMatches');

exports.createProject = async (req, res) => {
  try {
    const [id] = await go.createOne('user_projects', 'id', req.body);
    const data = await go.getById('user_projects', id);
    res
      .status(201)
      .json({ message: 'Project successfully created!', data, id });
  } catch ({ message }) {
    res
      .status(400)
      .json({ message: "Couldn't create project", error: message });
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
      return res
        .status(404)
        .json({ message: 'A project with that ID was not found!' });
    }

    if (!data[0].privateProjects || await userMatches(req.user, data[0].userId || await collaboratorMatches(req.user, data[0].id))) {
      console.log('collab matches runs');
      res.status(200).json(data);
    } else {
      console.log('collab matches doesnt run');
      res
        .status(401)
        .json({ message: 'You are not authorized to view this project!' });
    }
  } catch ({ message }) {
    res.status(400).json({ message: "Couldn't find project.", error: message });
  }
};

exports.getProjectByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (await userMatches(req.user, userId)) {
      const data = await go
        .getByUserId('user_projects as up', userId, 'up.*', 'u.username')
        .innerJoin('users as u', 'up.userId', '=', 'u.id');

      res.status(200).json(data);
    } else {
      console.log('user doesnt match')
      /*
    Create a middleware that checks if this user is part of a team
    */
      const data = await go
        .getByUserId('user_projects as up', userId, 'up.*', 'u.username')
        .where('privateProjects', '=', false)
        .innerJoin('users as u', 'up.userId', '=', 'u.id');

      res.status(200).json(data);
    }
  } catch ({ message }) {
    res
      .status(400)
      .json({ message: "Couldn't get projects by user.", error: message });
  }
};

//FOR RECENT PROJECT VIEW

exports.getRecentProjectByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (await userMatches(req.user, userId)) {
      const data = await go
        .getByUserId('user_projects', userId)
        .orderBy('created_at', 'desc')
        .limit(8);
      res.status(200).json(data);
    } else {
      const data = await go
        .getByUserId('user_projects', userId)
        .where('privateProjects', false)
        .orderBy('created_at', 'desc')
        .limit(8);
      res.status(200).json(data);
    }
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
        'user_projects.privateProjects',
        'user_projects.name',
        'user_projects.description',
        'user_projects.figma',
        'user_projects.invision',
        'user_projects.mainImg',
        'user_projects.created_at',
        'user_projects.updated_at'
      )
      .where('privateProjects', '=', false)
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
    const data = await db('user_projects')
      .where('projectName', 'like', `%${term}%`)
      .andWhere('privateProjects', false);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't find project.", error: error });
  }
};

exports.updateProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await go.getById('user_projects', id);

    if (data.length === 0) {
      res.status(404).json({ message: 'Invalid project ID' });
    } else {
      if (!(await userMatches(req.user, data[0].userId))) {
        // TODO: Check if part of a team!!!!

        res
          .status(401)
          .json({
            message:
              "Unauthorized: You may not update projects that don't belong to you."
          });
      } else {
        await go.updateById('user_projects', req.body, id);
        const updatedData = await go.getById('user_projects', id);

        res.status(200).json(updatedData);
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Couldn't update project.", error: error });
  }
};

exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('user_projects', id);

    if (data.length === 0) {
      res
        .status(404)
        .json({ message: 'A project with that ID could not be found!' });
    } else {
      if (await userMatches(req.user, data[0].userId)) {
        await go.destroyById('user_projects', id);
        res.status(200).json({ message: 'Project successfully deleted' });
      } else {
        res
          .status(401)
          .json({
            message:
              "Unauthorized: You may not delete projects that don't belong to you."
          });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete project.", error: error });
  }
};
