const db = require('../../data/dbConfig');

async function getinvite(_, { id }) {
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

// async function getinvitecount(_, { id }) {
//   console.log('ID', id);
//   try {
//     const data = await db('invite').where({ id: id }).count();
//     if (!data) throw new Error('User ID does not exist! 😕');
//     if (data.count === 0) throw new Error('This user has no activity! 🙃');
//     return data;
//   } catch (err) {
//     console.log(err);
//     return console.error();
//   }
// }
module.exports = { getinvite, getinvitecount };
