const db = require('../../data/dbConfig');

async function comments(_, { projectId }) {
  console.log('Project ID', projectId);
  try {
    const data = await db('comments').where({ projectId: projectId });
    if (!data) throw new Error('Project ID does not exist! 😕');
    if (data.length === 0) throw new Error('This project has no comments! 🙃');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getcomments(parent, args, ctx) {
  return await db('comments');
}

async function photocomments(_, { imageId }) {
  console.log('Image ID', imageId);
  try {
    const data = await db('comments').where({ imageId: imageId });
    if (!data) throw new Error('Image ID does not exist😕');
    return data;
  } catch (err) {
    return err;
  }
}

module.exports = { comments, getcomments, photocomments };
