const { gql } = require('apollo-server-express');

const userTypes = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    location: String
    bio: String
    website: String
    avatar: String!
    projects: [Project]!
    # followers: [Follower]!
  }

  type Project {
    id: ID!
    private: Boolean!
    name: String!
    description: String!
    figma: String
    invision: String
    mainImg: String!
    created_at: String!
    updated_at: String
    # photos: [ProjectPhoto]!
    comments: [Comment]!
  }

  type ProjectPhoto {
    id: ID!
    url: String!
    description: String!
    title: String!
    created_at: String!
  }

  type Comment {
    id: ID!
    text: String!
    created_at: String!
    user: User!
  }

  type Follower {
    id: ID!
    user: User!
    created_at: String!
  }
`;

module.exports = userTypes;
