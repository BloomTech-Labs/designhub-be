const typeDefs = require('../../schema');
const { mockServer } = require('graphql-tools');

describe('check schemas type definitions', () => {
  test('has valid typeDefs', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query(`{__schema{types{name}}}`);
    }).not.toThrow();
  });
});
