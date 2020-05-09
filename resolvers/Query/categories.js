const db = require('../../data/dbConfig');

async function getallcats(parents, args, ctx) {
  return await db('category_names');
}

async function getcatbyid(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('category_names').where({ id: id });
    if (!data) throw new Error('ID does not exist! 😟');
    if (data.category === null)
      throw new Error('This user does not have a category! 😖');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectcats(_, { id }) {
  console.log('ID', id);
  try {
    const data = await db('project_categories').where({ id: id });
    if (!data) throw new Error('ID does not exist! 😟');
    if (data === null)
      throw new Error('This user does not have a category! 😖');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function projectsbycat(_, { categoryId }) {
  console.log('Category ID', categoryId);
  try {
    const data = await db('project_categories').where({
      categoryId: categoryId,
    });
    if (!data) throw new Error('ID does not exist! 😟');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { getallcats, getcatbyid, projectcats, projectsbycat };
