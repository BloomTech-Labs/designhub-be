const { users, user, doesUserExist } = require('./Users');
const { project, projects } = require('./Projects');
const { searchUsers, searchProjects, search } = require('./Search');
const { heatmapById, heatmapByUserId } = require('./Heatmap');

const Query = {
  Query: {
    users,
    user,
    doesUserExist,
    project,
    projects,
    search,
    searchUsers,
    searchProjects,
    heatmapById,
    heatmapByUserId,
  },
};

module.exports = Query;
