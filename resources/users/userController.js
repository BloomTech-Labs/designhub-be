const go = require('../utils/crud');

exports.createUser = async (req, res) => {
  try {
    const [id] = await go.createOne('users', 'id', req.body);
    const user = await go.getById('users', id);
    res.status(201).json({ message: 'Account successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('users', id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find user.", error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await go
      .getMany('users')
      .limit(5)
      .offset(5);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't get users.", error: error });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.updateById('users', req.body, id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't update user.", error: error });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.destroyById('users', id);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: "Couldn't delete user.", error: error });
  }
};
