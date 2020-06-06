const { users, user } = require('./Users');
const { project, projects } = require('./Projects');

const Query = {
  Query: {
    users,
    user,
    project,
    projects,
  },
};

module.exports = Query;
