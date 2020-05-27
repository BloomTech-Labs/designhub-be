const { gql } = require('apollo-server-express');

const userTypes = gql`
  type User {
    id: ID!
    auth0Id: String
    username: String
    email: String
    phoneNumber: String
    firstName: String
    lastName: String
    location: String
    bio: String
    website: String
    avatar: String
    created_at: String
  }

  type Projects {
    id: ID
    userId: ID
    privateProjects: String
    name: String
    description: String
    figma: String
    invision: String
    created_at: String
    updated_at: String
    mainImg: String
  }

  type Project_photos {
    id: ID!
    projectId: ID!
    url: String
    description: String
    title: String
    created_at: String!
  }

  type Comments {
    id: ID
    userId: ID
    projectId: Int
    username: String
    imageId: Int
    top: String
    left: String
    text: String!
    created_at: String!
  }

  type Followers {
    id: ID!
    followingId: String!
    followedId: String!
    created_at: String!
  }

  type Heatmap {
    userId: Int
    projectId: Int
    imageId: Int
    count: Int
    date: String
    contribution: String
  }

  type Starred {
    id: ID
    userId: Int
    projectId: Int
    count: Int
    created_at: String
  }

  type Invite {
    id: ID!
    activeUserId: Int!
    invitedUserId: Int!
    starredProjectsId: Int
    commentsId: Int
    projectId: Int
    projectName: String
    imageId: Int
    activeUserAvatar: String
    activeUsername: String
    mainImgUrl: String
    commentText: String
    teamId: Int
    followersId: Int
    type: String
    message: String
    unread: Boolean
    created_at: String
  }

  type Categories {
    id: ID!
    category: String
  }

  type User_research {
    id: ID
    url: String
    projectId: String
    created_at: String
  }

  type Project_invite {
    id: ID!
    email: String!
    projectId: Int!
    created_at: String!
    updated_at: String!
  }

  type Explore {
    recent: Projects
    following: Projects
    popular: Projects
  }
`;

module.exports = userTypes;
