const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  heatmapById,
  heatmapByUserId,
  addHeatmap,
  updateHeatmap,
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

const addHeatmapMutation = `
mutation addHeatmap($data:AddHeatmapInput!){
	addHeatmap(data:$data){
    userId
    projectId
    imageId
    count
    contribution
  }
}
`;

const updateHeatmapMutation = `
mutation updateHeatmap($data:UpdateHeatmapInput!){
  updateHeatmap(data:$data){
    id
    userId
    projectId
    imageId
    count
    contribution
  }
}
`;

const deleteHeatmapMutation = ` 
mutation deleteHeatmap($id:ID!){
  deleteHeatmap(id:$id)
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
    const failedRes = await query({
      query: heatmapByIdQuery,
      variables: {
        id: '6',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch('No data to display!... 💩');
  });

  it('Gets heatmap by  user Id 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: heatmapByUserIdQuery,
      variables: {
        userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        heatmapByUserId,
      },
    });
    const failedRes = await query({
      query: heatmapByUserIdQuery,
      variables: {
        userId: 'auth0|5dc999e4d958d80e7bb7b597',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch('No data to display!... 💩');
  });

  it('Adds heatmap 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addHeatmapMutation,
      variables: {
        data: {
          userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
          projectId: 2,
          imageId: 2,
          count: 3,
          contribution: 'A whole bunch',
        },
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        addHeatmap,
      },
    });
  });

  it('Adds heatmap 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateHeatmapMutation,
      variables: {
        data: {
          id: '2',
          userId: 'auth0|5d83b8d3d8e1cf0df49647e3',
          projectId: 2,
          imageId: 2,
          count: 4,
          contribution: 'A whole bunch more',
        },
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        updateHeatmap,
      },
    });
  });

  it('Deletes user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteHeatmapMutation,
      variables: {
        id: '2',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteHeatmap: true,
      },
    });
  });
});
