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
    res.status(201).json({ message: 'Heatmap successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create heatmap", error: error });
  }
};

exports.getHeatmapsFromUserId = async (req, res) => {
  if (!req.params.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  const { userId } = req.params;

  try {
    const data = await db('heatmap')
      .select('*')
      .where('userId', userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the user's heatmaps", error: error });
  }
};

exports.deleteHeatmapById = async (req, res) => {
  const { id } = req.params;
  try {
    await go.destroyById('comments', id);
    res
      .status(200)
      .json({ message: 'Heatmap contribution successfully deleted' });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Couldn't delete heatmap contribution.", error: error });
  }
};

exports.getTotalHeatmapContributions = async (req, res) => {
  if (!req.params.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  const { userId } = req.params;

  try {
    const data = await db('heatmap')
      .count('count')
      .where('userId', userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({
        message: "Couldn't find the user's heatmap total",
        error: error
      });
  }
};
