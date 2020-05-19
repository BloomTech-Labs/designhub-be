const { gql } = require('apollo-server-express');

const inputTypes = gql`
  input UserInput {
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

  input updateUserInput {
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
    userId: ID!
    privateProjects: String
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String
  }

  input ProjectPhotoInput {
    projectId: Int!
    url: String
    description: String!
    title: String!
  }

  input CommentsInput {
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
    userId: Int!
    projectId: Int!
    imageId: Int
    count: Int
    date: String
    contribution: String!
  }

  input addStarredInput {
    userId: Int!
    projectId: Int!
    count: Int
  }

  input InviteInput {
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
    categoryId: ID
    category: String!
  }

  input UserResearchInput {
    url: String
    projectId: String
  }
`;

module.exports = inputTypes;
