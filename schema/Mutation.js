const { gql } = require('apollo-server-express');

const mutationTypes = gql`
  type Mutation {
    addUser(data: UserInput!): User!
    updateUser(data: updateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    addProject(data: ProjectInput!): Projects!
    updateProject(data: updateProjectInput!): Projects!
    deleteProject(id: ID!): Boolean!
    addProjectPhoto(data: ProjectPhotoInput!): Project_photos!
    updateProjectPhoto(data: updateProjectPhotoInput!): Project_photos!
    deleteProjectPhotos(id: ID!): Boolean!
    addComments(data: CommentsInput!): Comments!
    updateComments(data: updateCommentsInput!): Comments!
    deleteComments(id: ID!): Boolean!
    addFollower(data: addFollowerInput!): Followers!
    deleteFollower(id: ID!): Boolean!
    addHeatmap(data: addHeatmapInput!): Heatmap!
    deleteHeatmap(userId: Int!): Heatmap!
    addStarred(data: addStarredInput!): Starred!
    deleteStarred(id: ID!): Boolean!
    addInvite(data: InviteInput): Invite!
    addInviteFollow(data: InviteInput): Invite!
    addInviteStarred(data: InviteInput): Invite!
    addInviteComments(data: InviteInput): Invite!
    updateInvites(data: updateInviteInput): Invite!
    deleteInvite(id: ID!): Boolean!
    search(text: String!): Search!
    addCategory(data: CategoryInput): Categories!
    updateCategory(data: updateCategoryInput): Categories!
    deleteCategory(id: ID!): Boolean!
    addUserResearch(data: UserResearchInput): User_research!
    addUserResearching(data: UserResearchInput): User_research!
    deleteUserResearch(id: ID!): Boolean!
    addProjectInvite(data: InviteInput): Project_invite!
    updateProjectInvite(data: updateInviteInput): Project_invite!
    updateProjectInvites(data: InviteInput): Project_invite!
    deleteProjectInvite(id: ID!): Boolean!
  }
  type Search {
    user: [User]
    project: [Projects]
  }
`;

module.exports = mutationTypes;
