const db = require('../../data/dbConfig');
const { users, user, username } = require('./users.js');
const {
  projects,
  project,
  projectuser,
  projectuserlimit,
} = require('./project');
const {
  projectphotos,
  projectphotosone,
  projectphoto,
} = require('./projectphotos');

const Query = {
  Query: {
    users,
    user,
    username,
    projects,
    project,
    projectuser,
    projectuserlimit,
    projectphotos,
    projectphotosone,
    projectphoto,
  },
};

module.exports = Query;
