const db = require('../../data/dbConfig');

async function comment(_, { id }) {
  try {
    const data = await db('comments').where('id', id).first();
    if (!data) throw new Error('No data to display!... 💩');
    // console.log(data);
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

module.exports = { comment };
