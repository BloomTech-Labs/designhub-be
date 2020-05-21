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

  input updateProjectInput {
    userId: ID!
    privateProjects: String
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String
  }

  input ProjectPhotoInput {
    projectId: ID!
    url: String
    description: String!
    title: String!
  }

  input updateProjectPhotoInput {
    id: ID!
    projectId: ID!
    url: String
    description: String!
    title: String!
  }

  input CommentsInput {
    userId: ID!
    username: String!
    projectId: Int!
    text: String!
  }

  input updateCommentsInput {
    id: ID!
    userId: ID!
    projectId: Int!
    username: String!
    text: String!
  }

  input PhotoCommentsInput {
    userId: ID!
    username: String!
    imageId: ID!
    text: String!
    top: String!
    left: String!
  }

  input updatePhotoCommentsInput {
    userId: ID!
    id: ID!
    username: String!
    imageId: Int!
    text: String!
    top: String
    left: String
  }

  input addFollowerInput {
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
  input updateInviteInput {
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
    categoryId: ID
    category: String!
  }

  input updateCategoryInput {
    id: ID!
    categoryId: ID
    category: String!
  }

  input UserResearchInput {
    url: String
    projectId: String
  }
`;

module.exports = inputTypes;
