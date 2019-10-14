const moment = require('moment');

const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createHeatmap = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }
  try {
    const body = {
      ...req.body,
      date: moment(new Date()).format('YYYY-MM-DD')
    };
    const [id] = await go.createOne('heatmap', 'id', body);
    const data = await go.getById('heatmap', id);
    res.status(201).json({ message: 'Heatmap successfully created!', data });
  } catch (error) {
    res.status(400).json({ message: "Couldn't create heatmap", error: error });
  }
};

// For heat map display
exports.getHeatmapsFromUserId = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db
      .select('date')
      .sum('count as count')
      .from('heatmap')
      .where('userId', id)
      .groupBy('date');

    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the user's heatmaps", error: error });
  }
};

exports.getAllHeatmapsFromUserId = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('heatmap')
      .select('*')
      .where('userId', id);
    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the user's heatmaps", error: error });
  }
};

exports.editHeatmap = async (req, res) => {
  const { id } = req.params;
  try {
    await go.updateById('heatmap', req.body, id);
    const data = await go.getById('heatmap', id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Couldn't update heatmap.", error: error });
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
  if (!req.params.id) {
    res.status(400).json({ message: 'id was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await db('heatmap')
      .count('count')
      .where('userId', id);
    res.status(200).json(data);
  } catch (err) {
    console.error(error);
    res.status(400).json({
      message: "Couldn't find the user's heatmap total",
      error: error
    });
  }
};
