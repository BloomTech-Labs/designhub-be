// const go = require('../utils/crud');
// const db = require('../../data/dbConfig');

// exports.createTeamMember = async (req, res) => {
//   if (!req.body.userId) {
//     res
//       .status(400)
//       .json({ message: 'userId was not attached to the req.body' });
//     if (!req.body.teamId) {
//       res
//         .status(400)
//         .json({ message: 'teamId was not attached to the req.body' });
//       try {
//         const [id] = await go.createOne('team_member', 'id', req.body);
//         const data = await go.getById('team_member', id);
//         res
//           .status(201)
//           .json({ message: 'Team member successfully created!', data });
//       } catch (error) {
//         res
//           .status(400)
//           .json({ message: 'Could create team member', error: error });
//       }
//     }
//   }
// };

// exports.getTeamMembersByTeamId = async (req, res) => {
//   if (!req.body.teamId) {
//     res
//       .status(400)
//       .json({ message: 'teamId was not attached to the req.body' });
//   }

//   try {
//     const data = await db('team_member').where('teamId', req.body.teamId);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ message: "Couldn't find team members.", error: error });
//   }
// };

// exports.deleteTeamMemberById = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }
//   const { id } = req.params;
//   try {
//     await go.destroyById('team_member', id);
//     res.json({ message: 'Successfully deleted teammember' });
//   } catch (err) {
//     console.error(err);
//     res.json({ message: 'Unable to delete team member' });
//   }
// };

// exports.updateTeamMemberById = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }

//   if (!req.body) {
//     res.status(400).json({ message: 'there was no req.body' });
//   }

//   const { id } = req.params;
//   try {
//     await go.updateById('team_member', req.body, id);
//     const data = await go.getById('team_member', id);
//     res.status(200).json(data);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Couldn't update team member.", error: error });
//   }
// };
