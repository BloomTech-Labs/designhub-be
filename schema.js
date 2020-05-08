const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    auth0Id: String!
    username: String!
    email: String!
    phoneNumber: String!
    firstName: String!
    lastName: String!
    location: String!
    bio: String!
    website: String!
    avatar: String!
    created_at: String!
  }

  type Projects {
    id: ID!
    userId: ID!
    privateProjects: String!
    name: String!
    description: String!
    figma: String!
    invision: String!
    created_at: String!
    updated_at: String!
    mainImg: String!
  }

  type Project_photos {
    id: ID!
    projectId: Int!
    url: String
    description: String
    title: String
    created_at: String!
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    username(username: String!): Boolean!
    projects: [Projects]!
    project(id: ID!): Projects!
    projectuser(userId: ID!): Projects!
    projectuserlimit(userId: ID!): [Projects]!
    projectphotos(projectId: Int!): [Project_photos]!
    projectphotosone(projectId: Int!): Project_photos!
    projectphoto: [Project_photos]!
  }
`;
module.exports = typeDefs;
