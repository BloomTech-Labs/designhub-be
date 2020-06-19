const db = require('../../data/dbConfig');

async function heatmapById(_, { id }) {
  try {
    const data = await db
      .select('date')
      .sum('count as count')
      .from('heatmap')
      .where('id', id)
      .groupBy('date')
      .first();
    if (!data) throw new Error('No data to display!... 💩');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function heatmapByUserId(_, { userId }) {
  try {
    const data = await db
      .select('date')
      .sum('count as count')
      .from('heatmap')
      .where('userId', userId)
      .groupBy('date');
    if (!data) throw new Error('No data to display!... 💩');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { heatmapById, heatmapByUserId };
