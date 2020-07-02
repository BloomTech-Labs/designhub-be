const { Query } = require('./Query');
const { User } = require('./User');
const { Project } = require('./Project');
const { Comment } = require('./Comment');
const { Mutation } = require('./Mutation');

const resolvers = {
  Query,
  User,
  Project,
  Comment,
  Mutation,
};

module.exports = resolvers;
