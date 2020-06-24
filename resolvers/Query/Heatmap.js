const db = require('../../data/dbConfig');

async function heatmapById(_, { id }) {
  try {
    const data = await db('heatmap').where('id', id).orderBy('date').first();
    if (!data) throw new Error('No data to display!... 💩');
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function heatmapByUserId(_, { userId }) {
  try {
    const data = await db('heatmap').where('userId', userId).orderBy('date');
    if (!data) throw new Error('No data to display!... 💩');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { heatmapById, heatmapByUserId };
