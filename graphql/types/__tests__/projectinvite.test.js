// const { gCall } = require('../_test-utils_/gCall');
// const { gql } = require('apollo-server-express');
const { graphql } = require('graphql');
const typeDefs = require('../schema');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const testProjectInviteQuery = {
  id: 'test invites string',
  variables: {},
  context: {},
  query: `
        query {
            allprojectinvites{
                email
            }
        }
    `,
  expected: {
    data: {
      allprojectinvites: [
        {
          email: 'Hello World',
        },
        {
          email: 'Hello World',
        },
      ],
    },
  },
};

// const testCommentsQuery = {
//   id: 'test comment string',
//   variables: { id: 1 },
//   context: {},
//   query: `
//         query comments($id: Int!){
//             comments(projectId:$id){
//                 text
//             }
//         }
//     `,
//   expected: {
//     data: {
//       comments: [
//         {
//           text: 'Hello World',
//         },
//         {
//           text: 'Hello World',
//         },
//       ],
//     },
//   },
// };

describe('projectinviteSchema', () => {
  // it('gets all project invites', async () => {
  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  const cases = [testProjectInviteQuery];
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 5.5,
      Array: () => [],
      String: () => 'Hello World',
    },
  });
  cases.forEach((obj) => {
    const { id, variables, ctx, query, expected } = obj;
    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });
});
