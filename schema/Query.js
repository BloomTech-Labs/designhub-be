const { gql } = require('apollo-server-express');

const queryTypes = gql`
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

module.exports = queryTypes;
