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
    const project = await db('user_projects').insert(data).returning('*');
    console.log(project);
    return project[0];
  },

  async updateProject(_, { data }) {
    const project = await db('user_projects').update(data).returning('*');
    console.log(project);
    return project[0];
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
    const project = await db('user_projects').update(data).returning('*');
    console.log(project);
    return project[0];
  },

  async deleteProject(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedProject = await db('user_projects').where('id', id).del();
      if (!deletedProject) return rej(false);
      return res(true);
    });
  },

  async addProjectPhoto(_, { data }) {
    const projectPhoto = await db('project_photos').insert(data).returning('*');
    console.log(projectPhoto);
    return projectPhoto[0];
  },

  async updateProjectPhoto(_, { data }) {
    const projectPhoto = await db('project_photos').update(data).returning('*');
    console.log(projectPhoto);
    return projectPhoto[0];
  },

  async deleteProjectPhotos(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedProjectPhoto = await db('project_photos')
        .where('id', id)
        .del();
      if (!deletedProjectPhoto) return rej(false);
      return res(true);
    });
  },

  async addComments(_, { data }) {
    const comments = await db('comments').insert(data).returning('*');
    console.log(comments);
    return comments[0];
  },

  async updateComments(_, { data }) {
    const comments = await db('comments').update(data).returning('*');
    console.log(comments);
    return comments[0];
  },

  async deleteComments(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedComments = await db('comments').where('id', id).del();
      if (!deletedComments) return rej(false);
      return res(true);
    });
  },

  async addFollower(_, { data }) {
    const followers = await db('user_followers').insert(data).returning('*');
    console.log(followers);
    return followers[0];
  },

  async deleteFollower(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedFollower = await db('user_followers').where('id', id).del();
      if (!deletedFollower) return rej(false);
      return res(true);
    });
  },

  async addHeatmap(_, { data }) {
    const heatmap = await db('heatmap').insert(data).returning('*');
    console.log(heatmap);
    return heatmap[0];
  },

  async deleteHeatmap(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteHeat = await db('heatmap').where('id', id).del();
      if (!deleteHeat) return rej(false);
      return res(true);
    });
  },

  async addStarred(_, { data }) {
    const starred = await db('starred_projects').insert(data).returning('*');
    console.log(starred);
    return starred[0];
  },

  async deleteStarred(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteStar = await db('starred_projects').where('id', id).del();
      if (!deleteStar) return rej(false);
      return res(true);
    });
  },

  async addInvite(_, { data }) {
    const invite = await db('invite').insert(data).returning('*');
    console.log(invite);
    return invite[0];
  },

  async addInviteFollow(_, { data }) {
    const invite = await db('invite').insert(data).returning('*');
    console.log(invite);
    return invite[0];
  },

  async addInviteStarred(_, { data }) {
    const invite = await db('invite').insert(data).returning('*');
    console.log(invite);
    return invite[0];
  },

  async addInviteComments(_, { data }) {
    const invite = await db('invite').insert(data).returning('*');
    console.log(invite);
    return invite[0];
  },

  async updateInvites(_, { data }) {
    const invite = await db('invite').update(data).returning('*');
    console.log(invite);
    return invite[0];
  },

  async deleteInvite(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteInvite = await db('invite').where('id', id).del();
      if (!deleteInvite) return rej(false);
      return res(true);
    });
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
    const category = await db('project_categories').insert(data).returning('*');
    console.log(category);
    return category[0];
  },

  async updateCategory(_, { data }) {
    const category = await db('project_categories').update(data).returning('*');
    console.log(category);
    return category[0];
  },

  async deleteCategory(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteCategory = await db('project_categories')
        .where('id', id)
        .del();
      if (!deleteCategory) return rej(false);
      return res(true);
    });
  },

  async addUserResearch(_, { data }) {
    const userResearch = await db('user_research').insert(data).returning('*');
    console.log(userResearch);
    return userResearch[0];
  },

  async addUserResearching(_, { data }) {
    const userResearch = await db('user_research').insert(data).returning('*');
    console.log(userResearch);
    return userResearch[0];
  },

  async deleteUserResearch(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteResearch = await db('user_research').where('id', id).del();
      if (!deleteResearch) return rej(false);
      return res(true);
    });
  },

  async addProjectInvite(_, { data }) {
    const projectInvite = await db('project_teams').insert(data).returning('*');
    console.log(projectInvite);
    return projectInvite[0];
  },

  async updateProjectInvite(_, { data }) {
    const projectInvite = await db('project_teams').update(data).returning('*');
    console.log(projectInvite);
    return projectInvite[0];
  },

  async updateProjectInvites(_, { data }) {
    const projectInvite = await db('project_teams').update(data).returning('*');
    console.log(projectInvite);
    return projectInvite[0];
  },

  async deleteProjectInvite(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteProject = await db('project_teams').where('id', id).del();
      if (!deleteProject) return rej(false);
      return res(true);
    });
  },
};

module.exports = { Mutation };
