const { gql } = require('apollo-server-express');

const mutationTypes = gql`
  type Mutation {
    addUser(data: UserInput!): User!
    updateUser(data: UserInput!): User!
    deleteUser(id: ID!): Boolean!
    addProject(data: ProjectInput!): Project!
    updateProject(data: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    addProjectPhoto(data: ProjectPhotoInput!): ProjectPhoto!
    updateProjectPhoto(data: UpdateProjectPhotoInput!): ProjectPhoto!
    deleteProjectPhoto(id: ID!): Boolean!
    addComments(data: CommentsInput!): Comment!
    updateComments(data: UpdateCommentsInput!): Comment!
    deleteComments(id: ID!): Boolean!
    addFollower(data: AddFollowerInput!): Boolean!
    deleteFollower(data: AddFollowerInput!): Boolean!
    addHeatmap(data: AddHeatmapInput!): Heatmap!
    updateHeatmap(data: UpdateHeatmapInput!): Heatmap!
    deleteHeatmap(id: ID!): Boolean!
    search(searchText: String): Search
  }
`;

module.exports = mutationTypes;
