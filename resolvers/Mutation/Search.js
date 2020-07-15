const db = require('../../data/dbConfig');

async function search(_, { searchText }) {
  const userText = searchText.replace(/\s+/g, '').toLowerCase();
  const projectText = searchText.toLowerCase();
  try {
    const users = await db('users')
      .select('*')
      .whereRaw(`LOWER(username) LIKE ?`, [`%${userText}%`])
      .orWhereRaw(`LOWER(CONCAT("firstName", "lastName")) LIKE ?`, [
        `%${userText}%`,
      ]);

    const projects = await db('projects')
      .select('*')
      .whereRaw(`LOWER(name) LIKE ?`, [`%${projectText}%`])
      .andWhere('private', false);

    return { projects, users };
  } catch (err) {
    // console.log(err);
    return err;
  }
}

async function searchUsers(_, { searchText }) {
  return await db('users')
    .select('*')
    .whereRaw(`LOWER(username) LIKE ?`, [
      `%${searchText.replace(/\s+/g, '').toLowerCase()}%`,
    ])
    .orWhereRaw(`LOWER(CONCAT("firstName", "lastName")) LIKE ?`, [
      `%${searchText}%`,
    ]);
}

async function searchProjects(_, { searchText }) {
  return await db('projects')
    .select('*')
    .whereRaw(`LOWER(name) LIKE ?`, [`%${searchText.toLowerCase()}%`])
    .andWhere('private', false);
}

module.exports = { search, searchUsers, searchProjects };
