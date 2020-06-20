const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const { users, user } = require('../../__utils__/usersResponse');

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

describe('Users Resolvers 🌸', () => {
  it('Gets all users 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: usersQuery,
    });

    console.log('TEST RESPONSE ***', res);

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

    console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        user,
      },
    });
  });
});
