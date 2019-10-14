const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.getExploreOptions = async (req, res) => {
  //   if (!req.params.id) {
  //     res.status(400).json({ message: 'id was not attached to the req.params' });
  //   }
  const { id } = req.params;
  try {
    const following = await db('user_projects as p')
      .select(
        'p.id as projectId',
        'p.name as projectName',
        'p.teamId',
        'p.description as projectDescription',
        'p.figma as projectFigma',
        'p.mainImg as projectImage',
        'p.created_at as projectTimestamp',
        'f.*'
      )
      .where('followingId', id)
      .innerJoin('user_followers as f', 'p.userId', '=', 'f.followedId');

    const recent = await go
      .getMany('user_projects')
      .orderBy('created_at', 'desc');

    const popular = await db('user_projects as p')
      .select('p.*')
      .count('p.id')

      .innerJoin('starred_projects as s', 'p.id', 's.projectId')
      .groupBy('p.id')
      .orderBy('count', 'desc');

    res.status(200).json({ recent, following, popular });
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Couldn't find the photo's comments", error: error });
  }
};
