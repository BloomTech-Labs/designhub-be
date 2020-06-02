const db = require('../../data/dbConfig');

async function allprojectinvites(parents, args, ctx) {
  try {
    const data = await db('invite');
    if (!data) throw new Error('No invites exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectinvitesbyid(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('project_teams').where({ id: id });
    if (!data) throw new Error('User ID does not exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function userprojectinvitebyid(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('invite').where({ id: id });
    if (!data) throw new Error('User ID does not exist! 😕');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function userprojectinvites(parents, args, ctx) {
  return await db('invite');
}
module.exports = {
  allprojectinvites,
  projectinvitesbyid,
  userprojectinvites,
  userprojectinvitebyid,
};
