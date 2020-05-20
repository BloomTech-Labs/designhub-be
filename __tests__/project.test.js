const { graphql } = require('graphql');
const typeDefs = require('../schema');
const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');

const testProjectsQuery = {
	id: 'Get all projects',
	query: `
	query {
		projects {
			description
		}
	}
	`,
	variables: {},
	context: {},
	expected: {
		data: {
			projects: [
				{
					description: 'Dog'
				},
				{
					description: 'Dog'
				}
			]
		}
	}
};

describe('projectSchema', () => {
	const cases = [ testProjectsQuery ];

	const mockSchema = makeExecutableSchema({ typeDefs });

	addMockFunctionsToSchema({
		schema: mockSchema,

		mocks: {
			Boolean: () => false,
			ID: () => '1',
			Int: () => 1,
			Float: () => 12.34,
			String: () => 'Dog'
		}
	});

	test('has valid type definitions', async () => {
		expect(async () => {
			const MockServer = mockServer(typeDefs);

			await MockServer.query(`{__schema {types{name}}}`);
		}).not.toThrow();
	});

	cases.forEach((obj) => {
		const { id, query, variables, context: ctx, expected } = obj;

		test(`query: ${id}`, async () => {
			return await expect(graphql(mockSchema, query, null, { ctx }, variables)).resolves.toEqual(expected);
		});
	});
});
