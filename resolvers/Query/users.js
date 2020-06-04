const db = require('../../data/dbConfig');

async function users(parents, args, ctx) {
  return await db('users');
  // return 'HEY!';
}

async function user(_, { id }) {
  console.log('auth0ID', id);
  return await db('users').where({ auth0Id: id }).first();
}

async function username(_, { username }) {
  const data = await db('users').where({ username: username }).first();
  console.log('Username', username);
  if (data && data.username) {
    console.log('hello');
    return true;
  }
  return false;
}

module.exports = { users, user, username };
