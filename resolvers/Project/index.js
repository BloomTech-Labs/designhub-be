const db = require('../../data/dbConfig');

const Project = {
  Project: {
    async comments(project) {
      try {
        const comments = await db('comments').where({ projectId: project.id });
        if (!comments) throw new Error('No project with this id exists... 💩');
        // console.log(comments);
        return comments;
      } catch (err) {
        // console.log(err);
        return err;
      }
    },
    async photos(project) {
      try {
        const photos = await db('photos').where({ projectId: project.id });
        if (!photos) throw new Error('No project with this id exists... 💩');
        // console.log(photos);
        return photos;
      } catch (err) {
        // console.log(err);
        return err;
      }
    },
  },
};

module.exports = Project;
