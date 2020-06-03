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
const testFollowerQuery = {
  id: 'test follower string',
  variables: { id: '1' },
  context: {},
  query: `
        query follower($id: ID!){
            follower(id:$id){
                id
            }
        }
    `,
  expected: {
    data: {
      follower: {
        id: '1',
      },
    },
  },
};

describe('followersSchema', () => {
  // it('gets all categories', async () => {
  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  const cases = [testFollowersQuery, testFollowerQuery];
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
