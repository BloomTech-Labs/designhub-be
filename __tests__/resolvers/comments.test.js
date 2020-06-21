const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  addComments,
  updateComments,
} = require('../../__utils__/commentsResponse');

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

const addCommentMutation = `
mutation addComments($data: CommentsInput!){
    addComments(data:$data){
      userId
      projectId
      text
    }
  }
`;

const updateCommentMutation = `
mutation updateComments($data: UpdateCommentsInput!){
    updateComments(data:$data){
      id
      userId
      username
      projectId
      text
    }
  }
`;

const deleteCommentMutation = `
mutation deleteComments($id:ID!){
    deleteComments(id:$id)
  }
`;

describe('Comments Resolvers 🌸', () => {
  it('Adds comment 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addCommentMutation,
      variables: {
        data: {
          userId: 'abc122547564545642',
          projectId: '3',
          text: 'I am a test comment for update!',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        addComments,
      },
    });
  });

  it('Updates comment 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateCommentMutation,
      variables: {
        data: {
          id: '3',
          userId: 'abc122547564545642',
          username: 'IAmATester',
          projectId: '3',
          text: 'I am a test comment for update again!',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateComments,
      },
    });
  });
});

it('Deletes comments 🤡', async () => {
  const { query } = createTestClient(server);
  const res = await query({
    mutation: deleteCommentMutation,
    variables: {
      id: '3',
    },
  });

  // console.log('TEST RESPONSE ***', res);

  expect(res).toMatchObject({
    data: {
      deleteComments: true,
    },
  });
});
