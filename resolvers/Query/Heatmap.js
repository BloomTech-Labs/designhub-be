const db = require('../../data/dbConfig');

async function heatmapById(_, { id }) {
  try {
    const data = await db('heatmap').where('id', id).first();
    if (!data) throw new Error('No data to display!... 💩');
    // console.log(data);
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

async function heatmapByUserId(_, { userId }) {
  try {
    const data = await db('heatmap').where('userId', userId);
    if (data == 0) throw new Error('No data to display!... 💩');
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

module.exports = { heatmapById, heatmapByUserId };
