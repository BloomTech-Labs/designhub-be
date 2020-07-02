const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  search,
  searchUsers,
  searchProjects,
} = require('../../__utils__/searchResponse');

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

const searchQuery = `
query search($searchText:String!){
    search(searchText:$searchText){
        users{
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
}
`;

const searchUsersQuery = `
query searchUsers($searchText:String!){
    searchUsers(searchText:$searchText){
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

const searchProjectsQuery = `
query searchProjcts($searchText:String!){
    searchProjects(searchText:$searchText){
        id
        userId
        private
        name
        description
        mainImg
    }
}
`;

describe('Search Resolvers 🌸', () => {
  it('Searches everything 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: searchQuery,
      variables: {
        searchText: 'Erik',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        search,
      },
    });
  });

  it('Searches users 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: searchUsersQuery,
      variables: {
        searchText: 'Erik',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        searchUsers,
      },
    });
  });

  it('Searches projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: searchProjectsQuery,
      variables: {
        searchText: 'My Public Post',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        searchProjects,
      },
    });
  });
});
