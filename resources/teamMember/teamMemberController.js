const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.createTeamMember = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
    if (!req.body.teamId) {
      res
        .status(400)
        .json({ message: 'teamId was not attached to the req.body' });
      try {
        const [id] = await go.createOne('team_member', 'id', req.body);
        const data = await go.getById('team_member', id);
        res
          .status(201)
          .json({ message: 'Team member successfully created!', data });
      } catch (error) {
        res
          .status(400)
          .json({ message: 'Could create team member', error: error });
      }
    }
  }
};

// exports.getTeamById = async (req, res) => {
//   if (!req.params.id) {
//     res
//       .status(400)
//       .json({ message: 'userId was not attached to the req.params' });
//   }

//   const { id } = req.params;

//   try {
//     const data = await go.getById('team', id);
//     res.status(200).json(data);
//   } catch ({ message }) {
//     console.error(message);
//     res.status(400).json({ message: 'Couldnt find team', message });
//   }
// };

// exports.getAllTeams = async (req, res) => {
//   try {
//     const data = go.getMany('team');
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Couldnt teams' });
//   }
// };

// exports.deleteTeamById = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }
//   const { id } = req.params;
//   try {
//     await go.destroyById('team', id);
//     res.json({ message: 'Successfully deleted team' });
//   } catch (err) {
//     console.error(err);
//     res.json({ message: 'Unable to delete team' });
//   }
// };

// exports.updateTeamById = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }

//   if (!req.body) {
//     res.status(400).json({ message: 'there was no req.body' });
//   }

//   const { id } = req.params;
//   try {
//     await go.updateById('team', req.body, id);
//     const data = await go.getById('team', id);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json({ message: "Couldn't update team.", error: error });
//   }
// };
