const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createUser = async (req, res) => {
  const { family_name, given_name, nickname, picture, sub } = req.body.user;
  let user = [];
  //first search by sub

  try {
    user = await db('users')
      .select('*')
      .where('auth0Id', sub);
    console.log(user.length);
    if (user.length > 0) {
      res.status(200).json({ message: 'User already created', user });
    } else {
      let userObject = {
        lastName: family_name,
        firstName: given_name,
        auth0Id: sub,
        username: nickname,
        avatar: picture
      };

      const [id] = await go.createOne('users', 'id', userObject);
      const data = await go.getById('users', id);
      console.log(data);
      res.status(201).json({ message: 'Account successfully created!', user: data });
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
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find user.", error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await go.getMany('users').orderBy('id', 'asc');

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't get users.", error: error });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('users', req.body, id);
    const data = await go.getById('users', id);
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
