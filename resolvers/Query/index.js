const { users, user } = require('./Users');
const { project, projects } = require('./Projects');
const { searchUsers, searchProjects, search } = require('./Search');

const Query = {
  Query: {
    users,
    user,
    project,
    projects,
    search,
    searchUsers,
    searchProjects,
  },
};

module.exports = Query;
