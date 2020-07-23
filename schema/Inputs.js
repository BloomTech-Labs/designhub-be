const { gql } = require('apollo-server-express');

const inputTypes = gql`
  input UserInput {
    id: String!
    firstName: String
    lastName: String
    username: String
    email: String
    location: String
    bio: String
    website: String
    avatar: String
  }

  input ProjectInput {
    userId: ID!
    private: Boolean!
    name: String!
    description: String!
    category: String
    figma: String
    invision: String
    mainImg: String
  }

  input UpdateProjectInput {
    id: ID!
    userId: String!
    privateProjects: String
    name: String!
    description: String!
    category: String
    figma: String
    invision: String
    mainImg: String
  }

  input ProjectPhotoInput {
    projectId: ID!
    description: String!
    title: String!
    url: String!
  }

  input UpdateProjectPhotoInput {
    id: ID!
    projectId: ID!
    description: String!
    title: String!
    url: String!
  }

  input CommentsInput {
    userId: String!
    projectId: ID!
    text: String!
  }

  input UpdateCommentsInput {
    id: ID!
    userId: String!
    projectId: ID!
    text: String!
  }

  input AddFollowerInput {
    followingId: ID!
    followerId: ID!
  }

  input AddHeatmapInput {
    userId: String!
    projectId: Int!
    imageId: Int!
    count: Int!
    contribution: String!
  }

  input UpdateHeatmapInput {
    id: ID!
    userId: String!
    projectId: Int!
    imageId: Int!
    count: Int!
    contribution: String!
  }
`;
module.exports = inputTypes;
