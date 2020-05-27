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
      const deletedUser = await db('users').where('id', id).del();
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
    const projectPhoto = await db('project_photos')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(projectPhoto);
    return projectPhoto[0];
  },

  async deleteProjectPhotos(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedPhoto = await db('project_photos').where('id', id).del();
      if (!deletedPhoto) return rej(false);
      return res(true);
    });
  },

  async addComments(_, { data }) {
    const comments = await db('comments').insert(data).returning('*');
    console.log(comments);
    return comments[0];
  },

  async updateComments(_, { data }) {
    const comments = await db('comments')
      .update(data)
      .where('id', data.id)
      .returning('*');
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

  async addPhotoComments(_, { data }) {
    const comments = await db('comments').insert(data).returning('*');
    console.log(comments);
    return comments[0];
  },

  async updatePhotoComments(_, { data }) {
    const comments = await db('comments')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(comments);
    return comments[0];
  },

  async deletePhotoComments(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedPhotoComments = await db('comments').where('id', id).del();
      if (!deletedPhotoComments) return rej(false);
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
    const invite = await db('invite')
      .update(data)
      .where('id', data.id)
      .returning('*');
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
    const category = await db('category_names').insert(data).returning('*');
    console.log(category);
    return category[0];
  },

  async updateCategory(_, { data }) {
    const category = await db('category_names')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(category);
    return category[0];
  },

  async deleteCategory(_, { id }) {
    return new Promise(async (res, rej) => {
      const deleteCategory = await db('category_names').where('id', id).del();
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
    const projectInvite = await db('project_teams')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(projectInvite);
    return projectInvite[0];
  },

  async updateProjectInvites(_, { data }) {
    const projectInvite = await db('project_teams')
      .update(data)
      .where('id', data.id)
      .returning('*');
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
