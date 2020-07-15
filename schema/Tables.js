const { gql } = require('apollo-server-express');

const userTypes = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    username: String
    email: String!
    location: String
    bio: String
    website: String
    avatar: String
    projects: [Project]!
    followers: [User]!
  }

  type Project {
    id: ID!
    userId: ID!
    private: Boolean!
    name: String!
    description: String!
    category: String
    figma: String
    invision: String
    mainImg: String
    created_at: String!
    updated_at: String
    photos: [ProjectPhoto]!
    comments: [Comment]!
  }

  type ProjectPhoto {
    id: ID!
    projectId: ID!
    url: String!
    description: String!
    title: String!
    created_at: String!
  }

  type Comment {
    id: ID!
    userId: String!
    projectId: ID!
    text: String!
    created_at: String!
    user: User!
  }

  type Search {
    users: [User]!
    projects: [Project]!
  }

  type Heatmap {
    id: ID!
    userId: String!
    projectId: Int!
    imageId: Int!
    count: Int!
    contribution: String!
  }
`;

module.exports = userTypes;
