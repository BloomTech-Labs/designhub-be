const db = require('../../data/dbConfig');

async function projects(parents, args, ctx) {
  return await db('projects');
}

async function project(_, { id }) {
  // console.log('id', id);
  try {
    const project = await db('projects').where({ id }).first();
    if (!project) throw new Error('No project with this id exists... 💩');
    return project;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

module.exports = { projects, project };
