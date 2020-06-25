const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  heatmapById,
  heatmapByUserId,
} = require('../../__utils__/heatmapResponse');

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

const heatmapByIdQuery = `
query heatmapById($id:ID!){
    heatmapById(id:$id){
      userId
      projectId
      imageId
      count
      contribution
    }
  }
`;

const heatmapByUserIdQuery = `
query heatmapByUserId($userId:ID!){
  heatmapByUserId(userId:$userId){
    id
    projectId
    imageId
    count
    contribution
  }
}
`;

describe('Heatmap Resolvers 🌸', () => {
  it('Gets heatmap by Id 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: heatmapByIdQuery,
      variables: {
        id: '1',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        heatmapById,
      },
    });
  });

  it('Gets heatmap by  user Id 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: heatmapByUserIdQuery,
      variables: {
        userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
      },
    });

    console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        heatmapByUserId,
      },
    });
  });
});
