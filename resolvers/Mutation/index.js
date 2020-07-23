const db = require('../../data/dbConfig');
// const { ValidationError } = require('apollo-server-express');

const Mutation = {
  async addUser(_, { data }) {
    try {
      const checkUser = await db('users').where({ id: data.id }).first();
      if (checkUser) return checkUser;
      const user = await db('users').insert(data).returning('*');
      // console.log(user);
      return user[0];
    } catch (err) {
      // console.log(err);
      return err;
    }
  },

  async updateUser(_, { data }) {
    const user = await db('users')
      .update(data)
      .where('id', data.id)
      .returning('*');
    // console.log(user);
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
    const project = await db('projects').insert(data).returning('*');
    // console.log(project);
    return project[0];
  },

  async updateProject(_, { data }) {
    const project = await db('projects')
      .update(data)
      .where('id', data.id)
      .returning('*');
    // console.log(project);
    return project[0];
  },

  async deleteProject(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedProject = await db('projects').where('id', id).del();
      if (!deletedProject) return rej(false);
      return res(true);
    });
  },

  async addProjectPhoto(_, { data }) {
    const projectPhoto = await db('photos').insert(data).returning('*');
    // console.log(projectPhoto);
    return projectPhoto[0];
  },

  async updateProjectPhoto(_, { data }) {
    const projectPhoto = await db('photos')
      .update(data)
      .where('id', data.id)
      .returning('*');
    // console.log(projectPhoto);
    return projectPhoto[0];
  },

  async deleteProjectPhoto(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedPhoto = await db('photos').where('id', id).del();
      if (!deletedPhoto) return rej(false);
      return res(true);
    });
  },

  async addComments(_, { data }) {
    const comments = await db('comments').insert(data).returning('*');
    // console.log(comments);
    return comments[0];
  },

  async updateComments(_, { data }) {
    const comments = await db('comments')
      .update(data)
      .where('id', data.id)
      .returning('*');
    // console.log(comments);
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
    try {
      const doesExist = await db('followers').where({
        followerId: data.followerId,
        followingId: data.followingId,
      });
      // console.log('does exist', doesExist);
      if (doesExist.length >= 1)
        throw new Error('User is already following this person! 🤡');
      const followers = await db('followers').insert(data).returning('*');
      if (!followers) return false;
      return true;
    } catch (err) {
      // console.log(err);
      return err;
    }
  },

  async deleteFollower(_, { data }) {
    return new Promise(async (res, rej) => {
      const followers = await db('followers')
        .where({
          followerId: data.followerId,
          followingId: data.followingId,
        })
        .del();
      // console.log('followers', followers);
      return res(true);
    });
  },

  async addHeatmap(_, { data }) {
    const heatmap = await db('heatmap').insert(data).returning('*');
    // console.log(heatmap);
    return heatmap[0];
  },

  async updateHeatmap(_, { data }) {
    const heatmap = await db('heatmap')
      .update(data)
      .where('id', data.id)
      .returning('*');
    // console.log(heatmap);
    return heatmap[0];
  },

  async deleteHeatmap(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedHeatmap = await db('heatmap').where('id', id).del();
      if (!deletedHeatmap) return rej(false);
      return res(true);
    });
  },

  async search(_, { searchText }) {
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
  },
};

module.exports = { Mutation };
