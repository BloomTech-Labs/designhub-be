const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  addProjectPhoto,
  updateProjectPhoto,
} = require('../../__utils__/photoResponse');

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

addProjectPhotoMutation = `
mutation addProjectPhoto($data: ProjectPhotoInput!){
    addProjectPhoto(data:$data){
      projectId
      description
      title
      url
    }
  }
`;

updateProjectPhotoMutation = `
mutation updateProjectPhoto($data: UpdateProjectPhotoInput!){
    updateProjectPhoto(data:$data){
      id
      projectId
      description
      title
      url
    }
  }
`;

deleteProjectPhotoMutation = `
mutation deleteProjectPhoto($id:ID!){
    deleteProjectPhoto(id:$id)
  }
`;

describe('Photo Resolvers 🌸', () => {
  it('Adds Photos 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addProjectPhotoMutation,
      variables: {
        data: {
          projectId: '4',
          description: 'testing some more',
          title: 'testing update',
          url: 'www.testingagain.com',
        },
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        addProjectPhoto,
      },
    });
  });

  it('Updates photos 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateProjectPhotoMutation,
      variables: {
        data: {
          id: '3',
          projectId: '4',
          description: 'testing some more updates',
          title: 'testing update again',
          url: 'www.testingupdateagain.com',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateProjectPhoto,
      },
    });
  });

  it('Deletes project photos 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteProjectPhotoMutation,
      variables: {
        id: '3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteProjectPhoto: true,
      },
    });
  });
});
