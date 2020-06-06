const db = require('../../data/dbConfig');

const User = {
  User: {
    async projects(user) {
      try {
        const projects = await db('projects').where({ userId: user.id });
        if (!projects) throw new Error('Something went wrong... 💩');
        return projects;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  },
};

module.exports = User;
