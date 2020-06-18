const { gql } = require('apollo-server-express');

const queryTypes = gql`
  type Query {
    users: [User]!
    user(id: ID!): User!
    doesUserExist(id: ID!): Boolean!
    projects: [Project]!
    project(id: ID!): Project!
    search(searchText: String): Search
    searchUsers(searchText: String!): [User]!
    searchProjects(searchText: String!): [Project]!
  }
`;

module.exports = queryTypes;
