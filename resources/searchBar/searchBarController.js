const go = require('../utils/crud');
const db = require('../../data/dbConfig');

exports.search = async (req, res) => {
  console.log(req.body);
  const { searchText } = req.body;
  if (!searchText) {
    res.status(400).json({ message: 'No searchText attached to req.body' });
  }
  const projectText = searchText.toLowerCase();
  const userText = searchText.replace(/\s+/g, '').toLowerCase();
  try {
    const projects = await db('user_projects')
      .select('*')
      .whereRaw(`LOWER(name) LIKE ?`, [`%${projectText}%`])
      .andWhere('privateProjects', false);

      const users = await db('users')
        .select('*')
        .whereRaw(`LOWER(username) LIKE ?`, [`%${userText}%`])
        .orWhereRaw(`LOWER(CONCAT("firstName", "lastName")) LIKE ?`, [
          `%${userText}%`
        ]);
      //   .orWhereRaw(`LOWER("lastName") LIKE ?`, [`%${newText}%`]);
      // const users = await db('users')
      //   .select('*')
      //
      //   .orWhere('firstName', 'like', `%${newText}%`)
      //   .orWhere('lastName', 'like', `%${newText}%`);

      res.status(200).json({ projects, users });
    } catch (err) {
      console.error(err);
    }
  }

};
