// const { gCall } = require('../_test-utils_/gCall');
// const { gql } = require('apollo-server-express');
const { graphql } = require('graphql');
const typeDefs = require('../schema');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
} = require('graphql-tools');

const testCategoriesQuery = {
  id: 'test categories string',
  variables: {},
  context: {},
  query: `
        query {
            getallcats{
                id
            }
        }
    `,
  expected: {
    data: {
      getallcats: [
        {
          id: '1',
        },
        {
          id: '1',
        },
      ],
    },
  },
};
const testCategoryQuery = {
  id: 'test category string',
  variables: { id: '1' },
  context: {},
  query: `
        query getcatbyid($id: ID!){
            getcatbyid(id:$id){
                id
            }
        }
    `,
  expected: {
    data: {
      getcatbyid: {
        id: '1',
      },
    },
  },
};

describe('categoriesSchema', () => {
  // it('gets all categories', async () => {
  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  const cases = [testCategoriesQuery, testCategoryQuery];
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
