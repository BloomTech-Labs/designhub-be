const db = require('../../data/dbConfig');
const { ValidationError } = require('apollo-server-express');

const Mutation = {
  async addUser(_, { data }) {
    const user = await db('users').insert(data).returning('*');
    console.log(user);
    return user[0];
  },

  async updateUser(_, { data }) {
    const user = await db('users')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(user);
    return user[0];
  },

  async deleteUser(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedUser = await db('users').where({ id }).del();
      if (!deletedUser) return rej(false);
      return res(true);
    });
  },

  async addProject(_, { data }) {
    const project = await db('user_projects').insert(data).return('*');
    console.log(project);
    return project[0];
  },

  async updateProject(_, { data }) {
    return await db('user_projects')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async deleteProject(_, { id }) {
    const deletedProject = await db('user_projects')
      .del()
      .where('id', id)
      .first();
    try {
      if (!deletedProject) {
        throw new Error('This project does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addProjectPhoto(_, { data }) {
    return await db('project_photos').insert(data).return('*').first();
  },

  async updateProjectPhoto(_, { data }) {
    return await db('project_photos')
      .update(data)
      .where('id', data.id)
      .return('*');
  },

  async deleteProjectPhotos(_, { id }) {
    const deletedProjectPhoto = await db('project_photos')
      .del()
      .where('id', id);
    try {
      if (!deletedProjectPhoto) {
        throw new Error('This project does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addComments(_, { data }) {
    return await db('comments').insert(data).return('*').first();
  },

  async updateComments(_, { data }) {
    return await db('comments').update(data).where('id', data.id).return('*');
  },

  async deleteComments(_, { id }) {
    const deletedComments = await db('comments').del().where('id', id);
    try {
      if (!deletedComments) {
        throw new Error('This comment does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addPhotoComments(_, { data }) {
    return await db('comments').insert(data).return('*').first();
  },

  async updatePhotoComments(_, { data }) {
    return await db('comments')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async deletePhotoComments(_, { id }) {
    const deletedPhotoComments = await db('comments').del().where('id', id);
    try {
      if (!deletedPhotoComments) {
        throw new Error('This photo comment does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addFollower(_, { data }) {
    return await db('user_followers').insert(data).return('*').first();
  },

  async deleteFollower(_, { id }) {
    const deletedFollower = await db('user_followers')
      .del()
      .where('id', id)
      .first();
    try {
      if (!deletedFollower) {
        throw new Error('This photo comment does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addHeatmap(_, { data }) {
    return await db('heatmap').insert(data).return('*');
  },

  async deleteHeatmap(_, { id }) {
    try {
      const deletedHeatmap = await db('comments').del().where('id', id).first();
      if (!deletedHeatmap) {
        throw new Error('This heatmap does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addStarred(_, { data }) {
    return await db('starred_projects').insert(data).return('*').first();
  },

  async deleteStarred(_, { id }) {
    const deletedStarred = await db('starred_projects')
      .del()
      .where('id', id)
      .first();
    try {
      if (!deletedStarred) {
        throw new Error('This project does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addInvite(_, { data }) {
    return await db('invite').insert(data).return('*').first();
  },

  async addInviteFollow(_, { data }) {
    return await db('invite').insert(data).return('*').first();
  },

  async addInviteStarred(_, { data }) {
    return await db('invite').insert(data).return('*').first();
  },

  async addInviteComments(_, { data }) {
    return await db('invite').insert(data).return('*').first();
  },

  async updateInvites(_, { data }) {
    return await db('invite')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async deleteInvite(_, { id }) {
    const deletedInvite = await db('invite').del().where('id', id);
    try {
      if (!deletedInvite) {
        throw new Error('This project does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async search(_, { text }) {
    const projectText = text.toLowerCase();
    const userText = text.replace(/\s+/g, '').toLowerCase();
    try {
      if (!text) throw new ValidationError('Must add text to search!! 🙃');
      const projects = await db('user_projects')
        .select('*')
        .whereRaw(`LOWER(name) LIKE ?`, [`%${projectText}%`])
        .andWhere('privateProjects', false);

      const users = await db('users')
        .select('*')
        .whereRaw(`LOWER(username) LIKE ?`, [`%${userText}%`])
        .orWhereRaw(`LOWER(CONCAT("firstName", "lastName")) LIKE ?`, [
          `%${userText}%`,
        ]);
      return { projects, users };
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  async addCategory(_, { data }) {
    return await db('project_categories').insert(data).return('*').first();
  },

  async updateCategory(_, { data }) {
    return await db('project_categories')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async deleteCategory(_, { id }) {
    const deletedCategory = await db('invite').del().where('id', id);
    try {
      if (!deletedCategory) {
        throw new Error('This category does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addUserResearch(_, { data }) {
    return await db('user_research').insert(data).return('*').first();
  },

  async addUserResearching(_, { data }) {
    return await db('user_research').insert(data).return('*').first();
  },

  async deleteUserResearch(_, { id }) {
    const deletedUserResearch = await db('user_research').del().where('id', id);
    try {
      if (!deletedUserResearch) {
        throw new Error('This research does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addProjectInvite(_, { data }) {
    return await db('project_teams').insert(data).return('*').first();
  },

  async updateProjectInvite(_, { data }) {
    return await db('project_teams')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async updateProjectInvites(_, { data }) {
    return await db('project_teams')
      .update(data)
      .where('id', data.id)
      .return('*')
      .first();
  },

  async deleteProjectInvite(_, { id }) {
    const deletedProjectInvite = await db('user_research')
      .del()
      .where('id', id);
    try {
      if (!deletedProjectInvite) {
        throw new Error('This research does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },
};

module.exports = { Mutation };
