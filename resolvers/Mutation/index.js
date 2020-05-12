const db = require('../../data/dbConfig');
const { ValidationError } = require('apollo-server-express');

const Mutation = {
  async addUser(_, { data }) {
    return await db('users').insert(data).returning('*');
  },

  async updateUser(_, { data }) {
    return await db('users').update(data).returning('*');
  },

  async deleteUser(_, { id }) {
    const deletedUser = await db('users').del().where('id', id);
    try {
      if (!deletedUser) {
        throw new Error('This user does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addProject(_, { data }) {
    return await db('user_projects').insert(data).return('*');
  },

  async updateProject(_, { data }) {
    return await db('user_projects').update(data).return('*');
  },

  async deleteProject(_, { id }) {
    const deletedProject = await db('user_projects').del().where('id', id);
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
    return await db('project_photos').insert(data).return('*');
  },

  async updateProjectPhoto(_, { data }) {
    return await db('project_photos').update(data).return('*');
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
    return await db('comments').insert(data).return('*');
  },

  async updateComments(_, { data }) {
    return await db('comments').update(data).return('*');
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
    return await db('comments').insert(data).return('*');
  },

  async updatePhotoComments(_, { data }) {
    return await db('comments').update(data).return('*');
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
    return await db('user_followers').insert(data).return('*');
  },

  async deleteFollower(_, { id }) {
    const deletedFollower = await db('user_followers').del().where('id', id);
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
    const deletedHeatmap = await db('comments').del().where('id', id);
    try {
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
    return await db('starred_projects').insert(data).return('*');
  },

  async deleteStarred(_, { id }) {
    const deletedStarred = await db('starred_projects').del().where('id', id);
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
    return await db('invite').insert(data).return('*');
  },

  async addInviteFollow(_, { data }) {
    return await db('invite').insert(data).return('*');
  },

  async addInviteStarred(_, { data }) {
    return await db('invite').insert(data).return('*');
  },

  async addInviteComments(_, { data }) {
    return await db('invite').insert(data).return('*');
  },

  async updateInvites(_, { data }) {
    return await db('invite').update(data).return('*');
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
    return await db('project_categories').insert(data).return('*');
  },

  async updateCategory(_, { data }) {
    return await db('project_categories').update(data).return('*');
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

  async adduserResearch(_, { data }) {
    return await db('user_research').insert(data).return('*');
  },

  async adduserResearching(_, { data }) {
    return await db('user_research').insert(data).return('*');
  },

  async deleteuserResearch(_, { id }) {
    const deleteduserResearch = await db('user_research').del().where('id', id);
    try {
      if (!deleteduserResearch) {
        throw new Error('This research does not exist! 😕');
      }
    } catch (err) {
      console.log(err);
      return err;
    }
    return true;
  },

  async addProjectInvite(_, { data }) {
    return await db('project_teams').insert(data).return('*');
  },

  async updateProjectInvite(_, { data }) {
    return await db('project_teams').update(data).return('*');
  },

  async updateProjectInvites(_, { data }) {
    return await db('project_teams').update(data).return('*');
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

module.exports = Mutation;
