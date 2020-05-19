// const go = require('../utils/crud');
// const goSend = require('../utils/sendgrid');
// const db = require('../../data/dbConfig');

// exports.getInvitesByUserId = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const unReadNotifications = await db('invite')
//       .select('*')
//       .where('invitedUserId', id)
//       .andWhere('unread', true)
//       .orderBy('created_at', 'desc');

//     const readNotifications = await db('invite')
//       .select('*')
//       .where('invitedUserId', id)
//       .andWhere('unread', false)
//       .orderBy('created_at', 'desc');
//     res.json({ unReadNotifications, readNotifications });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Could not get invites', error: err });
//   }
// };

// exports.getInviteCountByUserId = async (req, res) => {
//   const { invitedUserId } = req.body;
//   errorHelper(res, invitedUserId, 'invitedUserId');
//   try {
//     const data = await db('invite')
//       .count('id')
//       .where('invitedUserId', invitedUserId);
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Could not get invites', error: error });
//   }
// };

// exports.createTeamInvite = async (req, res) => {
//   const {
//     activeUsername,
//     type,
//     invitedUserId,
//     activeUserId,
//     mainImgUrl,
//     teamId,
//     activeUserAvatar
//   } = req.body;

//   errorHelper(res, activeUsername, 'activeUsername');
//   errorHelper(res, invitedUserId, 'invitedUserId');
//   errorHelper(res, activeUserId, 'activeUserId');
//   errorHelper(res, mainImgUrl, 'mainImgUrl');
//   errorHelper(res, activeUserAvatar, 'activeUserAvatar');
//   errorHelper(res, teamId, 'teamId');
//   typeCheckHelper(res, type, 'team');

//   try {
//     const [id] = await go.createOne('invite', 'id', req.body);
//     const data = await go.getById('invite', id);
//     res
//       .status(201)
//       .json({ message: 'Team invite successfully created!', data });
//   } catch (error) {
//     res.status(400).json({ message: 'Could not create invite', error: error });
//   }
// };

// exports.createFollowInvite = async (req, res) => {
//   const { activeUsername, invitedUserId, activeUserAvatar } = req.body;
//   try {
//     const [id] = await go.createOne('invite', 'id', req.body);
//     const data = await go.getById('invite', id);
//     await goSend.follow(activeUserAvatar, activeUsername, invitedUserId);

//     res
//       .status(201)
//       .json({ message: 'Follow invite successfully created!', data });
//   } catch (error) {
//     res.status(400).json({ message: 'Could not create invite', error: error });
//   }
// };

// exports.createStarredInvite = async (req, res) => {
//   try {
//     const [id] = await go.createOne('invite', 'id', req.body);
//     const data = await go.getById('invite', id);
//     res
//       .status(201)
//       .json({ message: 'Star invite successfully created!', data });
//   } catch (error) {
//     res.status(400).json({ message: 'Could not create invite', error: error });
//   }
// };

// exports.createCommentsInvite = async (req, res) => {
//   try {
//     const {
//       activeUsername,
//       commentText,
//       invitedUserId,
//       mainImgUrl,
//       activeUserAvatar
//     } = req.body;

//     const [id] = await go.createOne('invite', 'id', req.body);
//     const data = await go.getById('invite', id);
//     const timeStamp = data[0].created_at;
//     await goSend.comment(
//       activeUserAvatar,
//       activeUsername,
//       commentText,
//       mainImgUrl,
//       invitedUserId,
//       timeStamp
//     );

//     res
//       .status(201)
//       .send({ message: 'Comments invite successfully created!', data });
//   } catch (error) {
//     console.log('heeey there');
//     console.error(error);
//     res.status(400).json({ message: 'Could not create invite', error: error });
//   }
// };

// exports.deleteInviteById = (req, res) => async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }
//   const { id } = req.params;
//   try {
//     await go.destroyById('invite', id);
//     res.json({ message: 'Successfully deleted invite' });
//   } catch (err) {
//     console.error(err);
//     res.json({ message: 'Unable to delete invite' });
//   }
// };

// exports.updateInviteById = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }

//   if (!req.body) {
//     res.status(400).json({ message: 'there was no req.body' });
//   }

//   const { id } = req.params;
//   try {
//     await go.updateById('invite', req.body, id);
//     const data = await go.getById('invite', id);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(400).json({ message: "Couldn't update invite.", error: error });
//   }
// };

// exports.getNewNotificationBoolean = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [count] = await db('invite')
//       .count('id')
//       .where('invitedUserId', id)
//       .andWhere('unread', true);

//     count.count > 0 ? res.status(200).json(true) : res.status(200).json(false);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: 'Could not get invites', error: error });
//   }
// };
