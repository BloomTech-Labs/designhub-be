const db = require('../../data/dbConfig');

async function followersfollowing(_, { followingId, followedId }) {
  const data = await db('user_followers')
    .where({ followingId: followingId })
    .first();
  const otherdata = await db('user_followers')
    .where({ followedId: followedId })
    .first();
  console.log('Followed ID', followedId);
  console.log('Following ID', followingId);
  if (data && otherdata) {
    return true;
  }
  return false;
}

async function followercount(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_followers').where('followedId', id).count();
    if (!data) throw new Error('This user does not exist! 😢');
    if (data.length === 0) throw new Error('This user has no followers! 😲');
    return data.count;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function followingcount(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_followers').where('followingId', id).count();
    if (!data) throw new Error('This user does not exist! 😢');
    if (data.length === 0)
      throw new Error('This user is not following anyone! 😲');
    return data.count;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function following(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_followers').where('followingId', id);
    if (!data) throw new Error('User ID does not exist! 😕');
    if (data.length === 0)
      throw new Error('This user is not following anyone! 😲');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function follower(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_followers').where('followedId', id);
    if (!data) throw new Error('User ID does not exist! 😕');
    if (data.length === 0)
      throw new Error('This user is not following anyone! 😲');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  followersfollowing,
  followercount,
  followingcount,
  following,
  follower,
};
