const db = require('../../data/dbConfig');

async function users() {
  return await db('users');
}

async function user(_, { id }) {
  try {
    // console.log('id', id);
    const user = await db('users').where({ id }).first();
    if (!user) throw new Error('No user with this id exists... 💩');
    return user;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

async function doesUserExist(_, { id }) {
  const user = await db('users').where({ id }).first();
  if (!user) return false;
  return true;
}

module.exports = { users, user, doesUserExist };
