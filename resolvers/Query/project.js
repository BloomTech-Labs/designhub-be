const db = require('../../data/dbConfig');

async function projects(parents, args, ctx) {
  return await db('user_projects');
}

async function project(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_projects').where({ id: id }).first();
    if (!data) throw new Error('User ID does not exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectuser(_, { userId }) {
  console.log('User ID', userId);
  try {
    const data = await db('user_projects').where({ userId: userId }).first();
    if (!data) throw new Error('User ID does not exist 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectuserlimit(_, { userId }) {
  console.log('User ID', userId);
  try {
    const data = await db('user_projects').where({ userId: userId }).limit(8);
    if (!data) throw new Error('User ID does not exist 😕');
    if (data.length === 0) throw new Error('This user has no projects! 🙃');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { projects, project, projectuser, projectuserlimit };
