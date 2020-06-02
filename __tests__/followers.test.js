const { graphql } = require('graphql');
const typeDefs = require('../schema');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const testFollowersQuery = {
  id: 'test followers string',
  variables: { id: 1, second: 2 },
  context: {},
  query: `
        query followersfollowing($id: Int!, $second: Int!){
                followersfollowing(followingId: $id, followedId: $second)
            }
    `,
  expected: {
    data: {
      followersfollowing: false,
    },
  },
};
// const testCategoryQuery = {
//   id: 'test category string',
//   variables: { id: '1' },
//   context: {},
//   query: `
//         query getcatbyid($id: ID!){
//             getcatbyid(id:$id){
//                 id
//             }
//         }
//     `,
//   expected: {
//     data: {
//       getcatbyid: {
//         id: '1',
//       },
//     },
//   },
// };

describe('followersSchema', () => {
  // it('gets all categories', async () => {
  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  const cases = [testFollowersQuery];
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
