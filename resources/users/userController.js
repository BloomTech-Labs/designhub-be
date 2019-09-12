const go = require('../utils/crud');

exports.createUser = async (req, res) => {
  try {
    const [id] = await go.createOne('users', 'id', req.body);
    const findUser = await go.getById('users', id);
    res
      .status(201)
      .json({ message: 'Account successfully created!', findUser });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await go.getById('users', id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ message: "Couldn't find user.", error: error });
  }
};
