const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  users,
  user,
  addUser,
  updateUser,
} = require('../../__utils__/usersResponse');

let server;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await knex.migrate.latest();
  return knex.seed.run();
});

afterAll(() => {
  return knex.migrate.rollback().then(() => knex.destroy());
});

const usersQuery = `
  query Users {
    users {
      id
      username
      email
      firstName
      lastName
      location
      bio
      website
      avatar
    }
  }
`;

const userQuery = `
query User($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar
  }
}
`;

const addUserMutation = `
mutation addUser($data: UserInput!){
  addUser(data:$data){
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar 
  }
} 
`;

const updateUserMutation = `
mutation updateUser($data: UserInput!){
  updateUser(data:$data){
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar 
  }
}
`;

const deleteUserMutation = `
mutation deleteUser($id:ID!){
  deleteUser(id:$id)
}
`;

describe('Users Resolvers 🌸', () => {
  it('Gets all users 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: usersQuery,
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        users,
      },
    });
  });

  it('Gets 1 user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: userQuery,
      variables: {
        id: 'google-oauth2|115383560506192673006',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        user,
      },
    });
  });

  it('Adds user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addUserMutation,
      variables: {
        data: {
          id: 'abc1225475645456',
          firstName: 'Testers',
          lastName: 'McTestersons',
          username: 'IAmATest',
          email: '1234563testing@test.com',
          location: 'Pittsburgh,PA',
          bio: 'Just a man looking at a girl',
          website: 'www.1234test.com',
          avatar: 'www.11334test.com',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        addUser,
      },
    });
  });

  it('Updates user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateUserMutation,
      variables: {
        data: {
          id: 'abc1225475645456',
          firstName: 'Testerson',
          lastName: 'McTestersonny',
          username: 'IAmATestforUpdate',
          email: '1234563testing@testupdate.com',
          location: 'Pittsburgh,PA',
          bio: 'Just a man looking at a girl who is testing',
          website: 'www.1234testupdate.com',
          avatar: 'www.11334testupdate.com',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateUser,
      },
    });
  });

  it('Deletes user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteUserMutation,
      variables: {
        id: 'abc1225475645456',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteUser: true,
      },
    });
  });
});
