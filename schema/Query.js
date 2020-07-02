const { gql } = require('apollo-server-express');

const queryTypes = gql`
  type Query {
    users: [User]!
    user(id: ID!): User!
    doesUserExist(id: ID!): Boolean!
    projects: [Project]!
    project(id: ID!): Project!
    comment(id: ID!): Comment!
    search(searchText: String): Search
    searchUsers(searchText: String!): [User]!
    searchProjects(searchText: String!): [Project]!
    heatmapById(id: ID!): Heatmap!
    heatmapByUserId(userId: ID!): [Heatmap]!
  }
`;

module.exports = queryTypes;
