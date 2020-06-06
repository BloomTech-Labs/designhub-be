const db = require('../../data/dbConfig');

const Project = {
  Project: {
    async comments(project) {
      try {
        const comments = await db('comments').where({ projectId: project.id });
        if (!comments) throw new Error('Something went wrong... 💩');
        console.log(comments);
        return comments;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    // async photos() {
    //   return;
    // },
  },
};

module.exports = Project;
