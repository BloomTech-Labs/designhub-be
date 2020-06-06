const db = require('../../data/dbConfig');

async function users(parents, args, ctx) {
  return await db('users');
}

async function user(_, { id }) {
  try {
    console.log('id', id);
    const user = await db('users').where({ id }).first();
    // console.log('user', user);
    if (!user) throw new Error('No user with this id exists... 💩');
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { users, user };
