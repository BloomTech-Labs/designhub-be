const { graphql } = require('graphql');
const typeDefs = require('../schema');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const testProjectsQuery = {
  id: 'test projects string',
  variables: {},
  context: {},
  query: `
        query {
            projects{
                name
            }
        }
    `,
  expected: {
    data: {
      projects: [
        {
          name: 'Hello World',
        },
        {
          name: 'Hello World',
        },
      ],
    },
  },
};
const testProjectQuery = {
  id: 'test project string',
  variables: { id: '1' },
  context: {},
  query: `
        query project($id: ID!){
            project(id:$id){
                name
            }
        }
    `,
  expected: {
    data: {
      project: {
        name: 'Hello World',
      },
    },
  },
};

describe('projectSchema', () => {
  // it('gets all projects', async () => {
  const mockSchema = makeExecutableSchema({
    typeDefs,
  });

  const cases = [testProjectsQuery, testProjectQuery];
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
