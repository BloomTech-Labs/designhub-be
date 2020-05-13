const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Mutation {
    addUser(data: addUserInput!): User!
    updateUser(data: updateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    addProject(data: addProjectInput!): Projects!
    updateProject(data: updateProjectInput!): Projects!
    deleteProject(id: ID!): Boolean!
    addProjectPhoto(data: addProjectPhotoInput!): Project_photos!
    updateProjectPhoto(data: updateProjectPhotoInput!): Project_photos!
    deleteProjectPhotos(id: ID!): Boolean!
    addComments(data: addCommentsInput!): Comments!
    updateComments(data: updateCommentsInput!): Comments!
    deleteComments(id: ID!): Boolean!
    addPhotoComments(data: addCommentsInput!): Comments!
    updatePhotoComments(data: updatePhotoCommentsInput!): Comments!
    deletePhotoComments(id: ID!): Boolean!
    addFollower(data: addFollowerInput!): Followers!
    deleteFollower(id: ID!): Boolean!
    addHeatmap(data: addHeatmapInput!): Heatmap!
    deleteHeatmap(id: ID!): Heatmap!
    addStarred(data: addStarredInput!): Starred!
    deleteStarred(id: ID!): Boolean!
    addInvite(data: addInviteInput): Invite!
    addInviteFollow(data: addInviteFollowInput): Invite!
    addInviteStarred(data: addInviteStarredInput): Invite!
    addInviteComments(data: addInviteCommentsInput): Invite!
    updateInvites(data: updateInvitesInput): Invite!
    deleteInvite(id: ID!): Boolean!
    search(text: String!): Search!
    addCategory(data: addCategoryInput): Categories!
    updateCategory(data: updateCategoryInput): Categories!
    deleteCategory(id: ID!): Boolean!
    adduserResearch(data: adduserResearchInput): User_research!
    adduserResearching(data: adduserResearchingInput): User_research!
    deleteuserResearch(id: ID!): Boolean!
    addProjectInvite(data: addProjectInviteInput): Project_invite!
    updateProjectInvite(data: updateProjectInviteInput): Project_invite!
    updateProjectInvites(data: updateProjectInvitesInput): Project_invite!
    deleteProjectInvite(id: ID!): Boolean!
  }

  type Search {
    user: [User]
    project: [Projects]
  }

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

  input addUserInput {
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

  input addProjectInput {
    id: ID!
    userId: ID!
    privateProjects: String
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String
  }

  input updateProjectInput {
    id: ID!
    userId: ID!
    privateProjects: String
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String
  }

  input addProjectPhotoInput {
    id: ID!
    projectId: Int!
    url: String
    description: String!
    title: String!
  }

  input updateProjectPhotoInput {
    id: ID!
    projectId: Int!
    url: String
    description: String!
    title: String!
  }

  input addCommentsInput {
    id: ID!
    userId: Int!
    projectId: Int
    username: String!
    imageId: Int
    top: String
    left: String
    text: String!
  }

  input updateCommentsInput {
    id: ID!
    userId: Int!
    projectId: Int
    username: String!
    imageId: Int
    top: String
    left: String
    text: String!
  }

  input addPhotoCommentsInput {
    id: ID!
    userId: Int!
    projectId: Int
    username: String!
    imageId: Int!
    top: String!
    left: String!
    text: String!
  }

  input updatePhotoCommentsInput {
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

  input addInviteInput {
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

  input addInviteFollowInput {
    id: ID!
    activeUserId: Int
    invitedUserId: Int!
    starredProjectsId: Int
    commentsId: Int
    projectId: Int
    projectName: String
    imageId: Int
    activeUserAvatar: String!
    mainImgUrl: String
    commentText: String
    activeUserName: String!
    teamId: String
    followersId: Int
    type: String
    message: String
    unread: Boolean
  }

  input addInviteStarredInput {
    id: ID!
    activeUserId: Int
    invitedUserId: Int
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
  }

  input addInviteCommentsInput {
    id: ID!
    activeUserId: Int
    invitedUserId: Int!
    starredProjectsId: Int
    commentsId: Int
    projectId: Int
    projectName: String
    imageId: Int
    activeUserAvatar: String!
    mainImgUrl: String!
    commentText: String!
    activeUserName: String!
    teamId: String
    followersId: Int
    type: String
    message: String
    unread: Boolean
  }

  input updateInvitesInput {
    id: ID!
    activeUserId: Int
    invitedUserId: Int!
    starredProjectsId: Int
    commentsId: Int
    projectId: Int
    projectName: String
    imageId: Int
    activeUserAvatar: String!
    mainImgUrl: String!
    commentText: String!
    activeUserName: String!
    teamId: String
    followersId: Int
    type: String
    message: String
    unread: Boolean
  }

  input addCategoryInput {
    id: ID!
    categoryId: ID
    category: String!
  }

  input updateCategoryInput {
    id: ID!
    categoryId: ID
    category: String!
  }

  input adduserResearchInput {
    id: ID!
    url: String
    projectId: String
  }

  input adduserResearchingInput {
    id: ID!
    url: String
    projectId: String!
  }

  input addProjectInviteInput {
    id: ID
    email: String!
    projectId: Int!
    write: Boolean!
    pending: Boolean
  }

  input updateProjectInviteInput {
    id: ID!
    email: String
    projectId: Int
    write: Boolean
    pending: Boolean
  }

  input updateProjectInvitesInput {
    id: ID!
    email: String
    projectId: Int
    write: Boolean
    pending: Boolean
  }
`;
module.exports = typeDefs;
