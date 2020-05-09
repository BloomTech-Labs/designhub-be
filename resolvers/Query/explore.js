const db = require('../../data/dbConfig');

async function getfollowing(_, { id }) {
  try {
    const data = await db('user_projects as p')
      .select('f.*', 'f.id as followerId', 'p.*')
      .where('followingId', id)
      .andWhere('privateProjects', false)
      .innerJoin('user_followers as f', 'p.userId', '=', 'f.followedId')
      .orderBy('p.created_at', 'desc');
    if (!data) throw new Error('User is not following anyone! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getrecent(parent, args, ctx) {
  await db('user_projects')
    .getMany('user_projects')
    .where('privateProjects', false)
    .orderBy('created_at', 'desc');
}

async function getpopular(parent, args, ctx) {
  try {
    const data = await db('user_projects as p')
      .select('p.*')
      .where('privateProjects', false)
      .count('p.id')

      .innerJoin('starred_projects as s', 'p.id', 's.projectId')
      .groupBy('p.id')
      .orderBy('count', 'desc');
    if (!data) throw new Error('No popular projects! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
module.exports = { getfollowing, getrecent, getpopular };
