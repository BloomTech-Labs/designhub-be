const db = require('../../data/dbConfig');

async function researchbyid(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('user_research').where({ id: id });
    if (!data) throw new Error('User ID does not exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function researchbyproject(_, { projectId }) {
  console.log('ID', projectId);
  try {
    const data = await db('user_research').where({ projectId: projectId });
    if (!data) throw new Error('User ID does not exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
module.exports = { researchbyid, researchbyproject };
