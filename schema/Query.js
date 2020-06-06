const { gql } = require('apollo-server-express');

const queryTypes = gql`
  type Query {
    users: [User]!
    user(id: ID!): User!
    projects: [Project]!
    project(id: ID!): Project!
  }
`;

module.exports = queryTypes;
