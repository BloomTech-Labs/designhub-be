const { gql } = require('apollo-server-express');

const inputTypes = gql`
  input UserInput {
    id: ID!
    auth0Id: String!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
    location: String
    bio: String
    website: String
    avatar: String
  }

  input ProjectInput {
    id: ID!
    userId: ID!
    privateProjects: String
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String
  }

  input ProjectPhotoInput {
    id: ID!
    projectId: Int!
    url: String
    description: String!
    title: String!
  }

  input CommentsInput {
    id: ID!
    userId: Int!
    projectId: Int
    username: String!
    imageId: Int
    top: String
    left: String
    text: String!
  }

  input addFollowerInput {
    id: ID
    followingId: Int!
    followedId: Int!
  }

  input addHeatmapInput {
    id: ID!
    userId: Int!
    projectId: Int!
    imageId: Int
    count: Int
    date: String
    contribution: String!
  }

  input addStarredInput {
    id: ID!
    userId: Int!
    projectId: Int!
    count: Int
  }

  input InviteInput {
    id: ID!
    activeUserId: Int!
    invitedUserId: Int!
    starredProjectsId: Int
    commentsId: Int
    projectId: Int
    projectName: String
    imageId: Int
    activeUserAvatar: String!
    mainImgUrl: String!
    commentText: String
    activeUserName: String
    teamId: String!
    followersId: Int
    type: String!
    message: String
    unread: Boolean
  }

  input CategoryInput {
    id: ID!
    categoryId: ID
    category: String!
  }

  input UserResearchInput {
    id: ID!
    url: String
    projectId: String
  }
`;

module.exports = inputTypes;
