const db = require('../../data/dbConfig');

async function starcount(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('starred_projects').where('userId', id);
    console.log(data);
    if (!data) throw new Error('User ID does not exist! 😕');
    if (data.length === 0) throw new Error('This user has no activity! 🙃');
    return data[0];
  } catch (err) {
    console.log(err);
    return console.error();
  }
}

module.exports = { starcount };
