const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  users,
  user,
  nestedUser,
  nestedFollower,
  addUser,
  updateUser,
} = require('../../__utils__/usersResponse');

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

const usersQuery = `
  query Users {
    users {
      id
      username
      email
      firstName
      lastName
      location
      bio
      website
      avatar
    }
  }
`;

const userQuery = `
query User($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar
  }
}
`;

const userExistQuery = `
query doesUserExist($id:ID!){
  doesUserExist(id:$id)
}
`;

const nestedUserQuery = `
query User($id: ID!) {
  user(id: $id) {
    projects{
      id
      userId
      private
      name
      description
      mainImg
    }
  }
}
`;

const nestedFollowerQuery = `
query User($id: ID!) {
  user(id: $id) {
    followers{
      id
      firstName
      lastName
      username
      email
      location
      bio
      website
      avatar
    }
  }
}
`;

const addUserMutation = `
mutation addUser($data: UserInput!){
  addUser(data:$data){
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar 
  }
} 
`;

const updateUserMutation = `
mutation updateUser($data: UserInput!){
  updateUser(data:$data){
    id
    firstName
    lastName
    username
    email
    location
    bio
    website
    avatar 
  }
}
`;

const deleteUserMutation = `
mutation deleteUser($id:ID!){
  deleteUser(id:$id)
}
`;

const addFollowerMutation = `
mutation addFollower($data: AddFollowerInput!){
  addFollower(data:$data)
}
`;

const deleteFollowerMutation = `
mutation deleteFollower($data: AddFollowerInput!){
  deleteFollower(data:$data)
}
`;

describe('Users Resolvers 🌸', () => {
  it('Gets all users 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: usersQuery,
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        users,
      },
    });
  });

  it('Gets 1 user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: userQuery,
      variables: {
        id: 'google-oauth2|115383560506192673006',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        user,
      },
    });
    const failedRes = await query({
      query: userQuery,
      variables: {
        id: 'abcjkh',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No user with this id exists... 💩'
    );
  });

  it('Does user exist 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: userExistQuery,
      variables: {
        id: 'google-oauth2|115383560506192673006',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        doesUserExist: true,
      },
    });

    const failedRes = await query({
      query: userExistQuery,
      variables: {
        id: 'asdsdfsdf',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(failedRes).toMatchObject({
      data: {
        doesUserExist: false,
      },
    });
  });

  it('Checks nested with projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: nestedUserQuery,
      variables: {
        id: 'auth0|5d83b8d3d8e1cf0df49647e3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        user: nestedUser,
      },
    });

    const failedRes = await query({
      query: nestedUserQuery,
      variables: {
        id: 'asdasdasdasd',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No user with this id exists... 💩'
    );
  });

  it('Checks nested with followers 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: nestedFollowerQuery,
      variables: {
        id: 'auth0|5d83b8d3d8e1cf0df49647e3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        user: nestedFollower,
      },
    });

    const failedRes = await query({
      query: nestedFollowerQuery,
      variables: {
        id: 'asdasdasdasd',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No user with this id exists... 💩'
    );
  });

  it('Adds user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addUserMutation,
      variables: {
        data: {
          id: 'abc1225475645456',
          firstName: 'Testers',
          lastName: 'McTestersons',
          username: 'IAmATest',
          email: '1234563testing@test.com',
          location: 'Pittsburgh,PA',
          bio: 'Just a man looking at a girl',
          website: 'www.1234test.com',
          avatar: 'www.11334test.com',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        addUser,
      },
    });
  });

  it('Updates user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateUserMutation,
      variables: {
        data: {
          id: 'abc1225475645456',
          firstName: 'Testerson',
          lastName: 'McTestersonny',
          username: 'IAmATestforUpdate',
          email: '1234563testing@testupdate.com',
          location: 'Pittsburgh,PA',
          bio: 'Just a man looking at a girl who is testing',
          website: 'www.1234testupdate.com',
          avatar: 'www.11334testupdate.com',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateUser,
      },
    });
  });

  it('Deletes user 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteUserMutation,
      variables: {
        id: 'abc1225475645456',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteUser: true,
      },
    });
  });

  it('Adds Follower 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addFollowerMutation,
      variables: {
        data: {
          followerId: 'google-oauth2|115383560506192673006',
          followingId: 'auth0|5d83b8d3d8e1cf0df49647e3',
        },
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        addFollower: true,
      },
    });
  });

  it('Deletes Follower 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteFollowerMutation,
      variables: {
        data: {
          followerId: 'google-oauth2|115383560506192673006',
          followingId: 'auth0|5d83b8d3d8e1cf0df49647e3',
        },
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteFollower: true,
      },
    });
  });
});
