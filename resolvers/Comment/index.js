const db = require('../../data/dbConfig');

const Comment = {
  Comment: {
    async user(comment) {
      try {
        const user = await db('users').where({ id: comment.userId }).first();
        if (!user) throw new Error('Something went wrong... 💩');
        // console.log(user);
        return user;
      } catch (err) {
        // console.log(err);
        return err;
      }
    },
  },
};

module.exports = Comment;
