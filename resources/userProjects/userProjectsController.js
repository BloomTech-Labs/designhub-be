const go = require('../utils/crud');

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
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find project.", error: error });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const data = await go.getMany('user_projects').orderBy('id', 'asc');

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't get projects.", error: error });
  }
};

exports.getProjectsByName = async (req, res) => {
  const { projectName } = req.body;
  try {
    const data = await getByRawWhere(
      'user_projects',
      "projectName like '%??%'",
      [projectName]
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find project.", error: error });
  }
};

exports.updateProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('user_projects', req.body, id);
    const data = await go.getById('user_projects', id);
    res.status(200).json({ data });
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
