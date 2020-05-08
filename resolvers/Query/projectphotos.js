const db = require('../../data/dbConfig');

async function projectphotos(_, { projectId }) {
  console.log('Photo ID', projectId);
  try {
    const data = await db('project_photos').where({ projectId: projectId });
    if (!data) throw new Error('Project ID does not exist 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectphotosone(_, { projectId }) {
  console.log('Photo ID', projectId);
  try {
    const data = await db('project_photos')
      .where({ projectId: projectId })
      .first();
    if (!data) throw new Error('Project ID does not exist 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectphoto(parents, args, ctx) {
  return await db('project_photos');
}

module.exports = { projectphotos, projectphotosone, projectphoto };
