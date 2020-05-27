// const { gCall } = require('../_test-utils_/gCall');
// const { gql } = require('apollo-server-express');
const { graphql } = require('graphql');
const typeDefs = require('../schema');
const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');

const testUsersQuery = {
	id: 'get all users',
	variables: {},
	context: {},
	query: `
        query {
            users{
                username
            }
        }
    `,
	expected: {
		data: {
			users: [
				{
					username: 'Hello World'
				},
				{
					username: 'Hello World'
				}
			]
		}
	}
};
const testUserQuery = {
	id: 'get user',
	variables: { id: '1' },
	context: {},
	query: `
        query User($id: ID!){
            user(id:$id){
                username
            }
        }
    `,
	expected: {
		data: {
			user: {
				username: 'Hello World'
			}
		}
	}
};

describe('userSchema', () => {
	// it('gets all users, yo!', async () => {
	const mockSchema = makeExecutableSchema({
		typeDefs
	});

	const cases = [ testUsersQuery, testUserQuery ];
	addMockFunctionsToSchema({
		schema: mockSchema,
		mocks: {
			Boolean: () => false,
			ID: () => '1',
			Int: () => 1,
			Float: () => 5.5,
			Array: () => [],
			String: () => 'Hello World'
		}
	});

	test('has valid typeDefs', async () => {
		expect(async () => {
			const MockServer = mockServer(typeDefs);
			await MockServer.query(`{__schema{types{name}}}`);
		}).not.toThrow();
	});

	cases.forEach((obj) => {
		const { id, variables, ctx, query, expected } = obj;
		test(`query: ${id}`, async () => {
			return await expect(graphql(mockSchema, query, null, { ctx }, variables)).resolves.toEqual(expected);
		});
	});
});

const testCategoryQuery = {
	id: 'get category',
	variables: { id: '1' },
	context: {},
	query: `
        query User($id: ID!){
            user(id:$id){
                username
            }
        }
    `,
	expected: {
		data: {
			user: {
				username: 'Hello World'
			}
		}
	}
};
