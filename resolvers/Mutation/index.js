const db = require('../../data/dbConfig');
const { ValidationError } = require('apollo-server-express');

const Mutation = {
  async addUser(_, { data }) {
    try {
      const checkUser = await db('users').where({ id: data.id }).first();
      if (checkUser) return checkUser;
      const user = await db('users').insert(data).returning('*');
      console.log(user);
      return user[0];
    } catch (err) {
      console.log(err);
      return err;
    }
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
    const project = await db('projects').insert(data).returning('*');
    console.log(project);
    return project[0];
  },

  async updateProject(_, { data }) {
    const project = await db('projects')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(project);
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
    console.log(projectPhoto);
    return projectPhoto[0];
  },

  async updateProjectPhoto(_, { data }) {
    const projectPhoto = await db('photos')
      .update(data)
      .where('id', data.id)
      .returning('*');
    console.log(projectPhoto);
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

  async addFollower(_, { data }) {
    const followers = await db('followers').insert(data).returning('*');
    console.log(followers);
    return followers[0];
  },

  async deleteFollower(_, { id }) {
    return new Promise(async (res, rej) => {
      const deletedFollower = await db('followers').where('id', id).del();
      if (!deletedFollower) return rej(false);
      return res(true);
    });
  },

  // async search(_, { text }) {
  //   const projectText = text.toLowerCase();
  //   const userText = text.replace(/\s+/g, '').toLowerCase();
  //   try {
  //     if (!text) throw new ValidationError('Must add text to search!! 🙃');
  //     const projects = await db('projects')
  //       .select('*')
  //       .whereRaw(`LOWER(name) LIKE ?`, [`%${projectText}%`])
  //       .andWhere('privateProjects', false);

  //     const users = await db('users')
  //       .select('*')
  //       .whereRaw(`LOWER(username) LIKE ?`, [`%${userText}%`])
  //       .orWhereRaw(`LOWER(CONCAT("firstName", "lastName")) LIKE ?`, [
  //         `%${userText}%`,
  //       ]);
  //     return { projects, users };
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // },
};

module.exports = { Mutation };
