const { gql } = require('apollo-server-express');

const queryTypes = gql`
  type Query {
    users: [User]!
    user(id: ID!): User!
    doesUserExist(id: ID!): Boolean!
    projects: [Project]!
    project(id: ID!): Project!
    category(category: String!): [Project]!
    comment(id: ID!): Comment!
    heatmapById(id: ID!): Heatmap!
    heatmapByUserId(userId: ID!): [Heatmap]!
  }
`;

module.exports = queryTypes;
