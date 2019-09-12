const go = require('../utils/crud');

exports.createUser = async (req, res) => {
  try {
    const response = await go.createOne('users', 'id', req.body);
    const findUser = await go.getById('users', response);
    res
      .status(201)
      .json({ message: 'Account successfully created!', findUser });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
};
