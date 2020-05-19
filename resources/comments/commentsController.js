// const go = require('../utils/crud');
// const db = require('../../data/dbConfig');

// const userMatches = require('../utils/userMatches');

// // ********************* PHOTO COMMENTS *************************
// //***************************************************************

// exports.createPhotoComment = async (req, res) => {
//   if (!req.body.imageId) {
//     return res
//       .status(400)
//       .json({ message: 'imageId was not attached to the req.body' });
//   } else if (!req.body.userId) {
//     return res
//       .status(400)
//       .json({ message: 'userId was not attached to the req.body' });
//   } else if (!req.body.text) {
//     return res
//       .status(400)
//       .json({ message: 'text was not attached to the req.body' });
//   } else if (!req.body.username) {
//     return res
//       .status(400)
//       .json({ message: 'username was not attached to the req.body' });
//   }
//   //Add middleware when Team members functionality is online so only specific people can comment
//   try {
//     if (await userMatches(req.user, req.body.userId)) {
//       const comment = {
//         imageId: req.body.imageId,
//         userId: req.body.userId,
//         text: req.body.text,
//         username: req.body.username,
//         left: req.body.left,
//         top: req.body.top
//       };

//       const [id] = await go.createOne('comments', 'id', comment);
//       const data = await go.getById('comments', id);
//       return res
//         .status(201)
//         .json({ message: 'Comment successfully created!', data });
//     } else {
//       return res
//         .status(401)
//         .json({
//           message:
//             'Unauthorized: You are not authorized to create a comment for someone else'
//         });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(400)
//       .json({ message: "Couldn't create comment", error: error });
//   }
// };

// exports.getCommentsByImageId = async (req, res) => {
//   if (!req.params.id) {
//     return res
//       .status(400)
//       .json({ message: 'id was not attached to the req.params' });
//   }
//   const { id } = req.params;
//   try {
//     const data = await db('comments')
//       .select(
//         'comments.id',
//         'u.username',
//         'u.avatar as userAvatar',
//         'comments.userId',
//         'comments.projectId',
//         'comments.imageId',
//         'comments.top',
//         'comments.left',
//         'comments.text',
//         'comments.created_at'
//       )
//       .where('imageId', id)
//       .innerJoin('users as u', 'comments.userId', '=', 'u.id')
//       .orderBy('comments.id', 'desc');

//     return res.status(200).json(data);
//   } catch (err) {
//     console.error(error);
//     return res
//       .status(400)
//       .json({ message: "Couldn't find the photo's comments", error: error });
//   }
// };

// // ********************* PROJECT COMMENTS *************************
// // ****************************************************************

// exports.createProjectComment = async (req, res) => {
//   if (!req.body.projectId) {
//     return res
//       .status(400)
//       .json({ message: 'projectId was not attached to the req.body' });
//   } else if (!req.body.userId) {
//     return res
//       .status(400)
//       .json({ message: 'userId was not attached to the req.body' });
//   } else if (!req.body.text) {
//     return res
//       .status(400)
//       .json({ message: 'text was not attached to the req.body' });
//   } else if (!req.body.username) {
//     return res
//       .status(400)
//       .json({ message: 'username was not attached to the req.body' });
//   }
//   //Add middleware when Team members functionality is online so only specific people can comment
//   try {
//     if (await userMatches(req.user, req.body.userId)) {
//       const [id] = await go.createOne('comments', 'id', req.body);
//       const data = await go.getById('comments', id);
//       return res
//         .status(201)
//         .json({ message: 'Comment successfully created!', data });
//     } else {
//       return res
//         .status(401)
//         .json({
//           message:
//             'Unauthorized: You are not authorized to create a comment for someone else'
//         });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(400)
//       .json({ message: "Couldn't create comment", error: error });
//   }
// };

// exports.getCommentsByProjectId = async (req, res) => {
//   if (!req.params.id) {
//     return res
//       .status(400)
//       .json({ message: 'id was not attached to the req.params' });
//   }

//   const { id } = req.params;
//   try {
//     const data = await db('comments')
//       .select(
//         'comments.id',
//         'u.username',
//         'u.avatar as userAvatar',
//         'comments.userId',
//         'comments.projectId',
//         'comments.imageId',
//         'comments.top',
//         'comments.left',
//         'comments.text',
//         'comments.created_at'
//       )
//       .where('projectId', id)
//       .innerJoin('users as u', 'comments.userId', '=', 'u.id')
//       .orderBy('comments.id', 'asc');
//     return res.status(200).json(data);
//   } catch (err) {
//     console.error(error);
//     return res
//       .status(400)
//       .json({ message: "Couldn't find the project's comments", error: error });
//   }
// };

// // ************************ SHARED ***********************************//
// //****************************************************************** */

// exports.updateCommentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await go.getById('comments', id);

//     if (await userMatches(req.user, data[0].userId)) {
//       await go.updateById('comments', req.body, id);
//       const data = await go.getById('comments', id);
//       return res.status(200).json(data);
//     } else {
//       return res
//         .status(401)
//         .json({
//           message:
//             "Unauthorized: You may not update comments that don't belong to you."
//         });
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Couldn't update comment.", error: error });
//   }
// };

// exports.deleteCommentById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const comment = await go.getById('comments', id);

//     if (comment.length === 0) {
//       return res
//         .status(404)
//         .json({ message: 'A comment with that ID does not exist.' });
//     }

//     if (await userMatches(req.user, comment.userId)) {
//       await go.destroyById('comments', id);
//       return res.status(200).json({ message: 'Comment successfully deleted' });
//     } else {
//       return res
//         .status(401)
//         .json({ message: 'Unauthorized: You may not delete this comment.' });
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: "Couldn't delete comment.", error: error });
//   }
// };
