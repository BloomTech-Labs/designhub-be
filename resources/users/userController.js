const go = require('../utils/crud');

exports.createUser = async (req, res) => {
  try {
    const response = await go.createOne('users', 'id', req.body);
    res
      .status(201)
      .json({ message: 'Account successfully created!', response });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
};
