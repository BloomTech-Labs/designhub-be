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

exports.getAllTeams = async (req, res) => {
  try {
    const data = go.getMany('team');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt teams' });
  }
};

// exports.deleteStar = async (req, res) => {
//   if (!req.body.id) {
//     res
//       .status(400)
//       .json({ message: 'userId was not attached to the req.body' });
//   }

//   if (!req.params.id) {
//     res
//       .status(400)
//       .json({ message: 'projectId was not attached to the req.params' });
//   }

//   try {
//     await db('starred_projects')
//       .del()
//       .where('projectId', req.params.id)
//       .andWhere('userId', req.body.id);
//     res.status(200).json({ message: 'Star successfully deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Couldn't delete star.", error: error });
//   }
// };
