const db = require('../../data/dbConfig');

const User = {
  User: {
    async projects(user) {
      try {
        const projects = await db('projects').where({ userId: user.id });
        if (!projects) throw new Error('Something went wrong... 💩');
        return projects;
      } catch (err) {
        //   console.log(err);
        return err;
      }
    },
    async followers(user) {
      try {
        const followers = await db('followers')
          .where({ followerId: user.id })
          .join('users', 'followers.followingId', 'users.id')
          .select('*');
        // console.log('User ID:', user.id);
        if (!followers) throw new Error('Something went wrong... 💩');
        // console.log('followers', followers);
        return followers;
      } catch (err) {
        //   console.log(err);
        return err;
      }
    },
  },
};

module.exports = User;
