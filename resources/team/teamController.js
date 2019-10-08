const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createTeam = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Name was not attached to the req.body' });

    try {
      const [id] = await go.createOne('team', 'id', req.body);
      const data = await go.getById('team', id);
      res.status(201).json({ message: 'Team successfully created!', data });
    } catch (error) {
      res.status(400).json({ message: 'Could create team', error: error });
    }
  }
};

exports.getTeamById = async (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  const { id } = req.params;

  try {
    const data = await go.getById('team', id);
    res.status(200).json(data);
  } catch ({ message }) {
    console.error(message);
    res.status(400).json({ message: 'Couldnt find team', message });
  }
};
