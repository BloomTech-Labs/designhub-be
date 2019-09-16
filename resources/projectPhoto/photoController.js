const go = require('../utils/crud');

exports.createPhoto = async (req, res) => {
  try {
    const [id] = await go.createOne('users', 'id', req.body);
    const data = await go.getById('users', id);
    res.status(201).json({ message: 'Account successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create account", error: error });
  }
};
