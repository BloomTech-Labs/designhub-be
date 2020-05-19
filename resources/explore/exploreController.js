// const go = require('../utils/crud');
// const db = require('../../data/dbConfig');

// exports.getExploreOptions = async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ message: 'id was not attached to the req.params' });
//   }
//   else {
//     const { id } = req.params;
//     try {
//       const following = await db('user_projects as p')
//         .select(
//           'f.*',
//           'f.id as followerId',
//           'p.*'
//         )
//         .where('followingId', id)
//         .andWhere('privateProjects', false)
//         .innerJoin('user_followers as f', 'p.userId', '=', 'f.followedId')
//         .orderBy('p.created_at', 'desc');

//       const recent = await go
//         .getMany('user_projects')
//         .where('privateProjects', false)
//         .orderBy('created_at', 'desc');

//       const popular = await db('user_projects as p')
//         .select('p.*')
//         .where('privateProjects', false)
//         .count('p.id')

//         .innerJoin('starred_projects as s', 'p.id', 's.projectId')
//         .groupBy('p.id')
//         .orderBy('count', 'desc');

//       res.status(200).json({ recent, following, popular });
//     } catch (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ message: "Couldn't access database", error: err });
//     }
//   }

// };
