const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createHeatmap = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }
  try {
    const [id] = await go.createOne('heatmap', 'id', req.body);
    const data = await go.getById('heatmap', id);
    res.status(201).json({ message: 'Project successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create project", error: error });
  }
};
