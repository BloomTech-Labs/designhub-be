const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const users = require('../../__utils__/usersResponse');

let server;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await knex.migrate.latest();
  return knex.seed.run();
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
});
