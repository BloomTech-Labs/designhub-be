const db = require('../../data/dbConfig');

async function heatmapget(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('heatmap').where({ id: id });
    if (!data) throw new Error('User ID does not exist! 😕');
    if (data.length === 0) throw new Error('This user has no activity! 🙃');
    return data[0];
  } catch (err) {
    console.log(err);
    return console.error();
  }
}

async function heatmapcount(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('heatmap').where({ id: id }).count();
    if (!data) throw new Error('User ID does not exist! 😕');
    if (data.length === 0) throw new Error('This user has no activity! 🙃');
    return data[0];
  } catch (err) {
    console.log(err);
    return console.error();
  }
}

module.exports = { heatmapget, heatmapcount };
