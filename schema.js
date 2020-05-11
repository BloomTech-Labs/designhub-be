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

  type Comments {
    id: ID!
    userId: Int!
    projectId: Int
    username: String!
    imageId: Int
    top: String
    left: String
    text: String!
    created_at: String!
  }

  type Followers {
    id: ID
    followingId: Int
    followedId: Int
    created_at: String
  }

  type Heatmap {
    id: ID!
    userId: Int
    projectId: Int
    imageId: Int
    count: Int
    date: String
    contribution: String
  }

  type Starred {
    id: ID!
    userId: Int!
    projectId: Int!
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
    mainImgUrl: String
    commentText: String
    activeUserName: String
    teamId: String
    followersId: Int
    type: String
    message: String
    unread: Boolean
    created_at: String
  }

  type Categories {
    id: ID!
    categoryId: ID!
    category: String
  }

  type User_research {
    id: ID
    url: String
    projectId: String
    created_at: String
  }

  type Project_invite {
    id: ID
    email: String
    projectId: Int
    created_at: String
    updated_at: String
  }

  type Explore {
    recent: Projects
    following: Projects
    popular: Projects
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
    comments(projectId: Int!): [Comments]!
    getcomments: [Comments]!
    photocomments(imageId: Int!): Comments!
    followersfollowing(followingId: Int!, followedId: Int!): Boolean!
    followercount(id: ID!): Followers!
    followingcount(id: ID!): Followers!
    following(id: ID!): Followers!
    follower(id: ID!): Followers!
    heatmapget(id: ID!): [Heatmap]!
    heatmapcount(id: ID!): Heatmap!
    starcount(id: ID!): Starred!
    getinvite(id: ID!): [Invite]!
    getinvitecount(id: ID!): Invite!
    getallcats: [Categories]!
    getcatbyid(id: ID!): Categories!
    projectcats(id: ID!): Categories!
    projectsbycat(categoryId: ID!): [Categories]!
    researchbyid(id: ID!): User_research!
    researchbyproject(projectId: String!): [User_research]!
    allprojectinvites: [Project_invite]!
    userprojectinvites: [Project_invite]!
    projectinvitesbyid(id: ID!): [Project_invite]!
    userprojectinvitebyid(id: ID!): [Project_invite]!
    getfollowing(id: ID!): [Explore]!
    getrecent: [Explore]!
    getpopular: [Explore]!
  }
`;
module.exports = typeDefs;
