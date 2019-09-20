const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createUser = async (req, res) => {
  const { sub } = req.body;
  let user = [];
  let avatar = null;
  //first search by sub

  try {
    user = await db('users')
      .select('*')
      .where('auth0Id', sub);

    if (user.length > 0) {
      res.status(200).json({ message: 'User already created', user });
    } else {
      if (req.body.picture) {
        avatar = req.body.picture;
      }
      let userObject = {
        auth0Id: sub,
        avatar: avatar
      };

      const [id] = await go.createOne('users', 'id', userObject);
      const user = await go.getById('users', id);
      res.status(201).json({ message: 'Account successfully created!', user });
    }
  } catch (err) {
    console.error(err);
    res.status(400).message({ message: 'bad request' });
  }
  console.log(user);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await go.getById('users', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't find user.", error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await go.getMany('users').orderBy('id', 'asc');

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't get users.", error: error });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('users', req.body, id);
    const data = await go.getById('users', id);
    res.status(200).json(data);
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
