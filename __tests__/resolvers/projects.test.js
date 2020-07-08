const { createTestClient } = require('apollo-server-testing');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../schema');
const resolvers = require('../../resolvers');

const knex = require('../../__utils__/dbConfig');

const {
  projects,
  project,
  nestedProject,
  nestedPhoto,
  addProject,
  updateProject,
} = require('../../__utils__/projectsResponse');

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

const projectsQuery = `
query Projects {
    projects {
      id
      private
      name
      description
      category
      figma
      invision
      mainImg
    }
  }
  `;

const projectQuery = `
  query Project($id: ID!) {
    project(id:$id) {
      id
      private
      name
      description
      category
      figma
      invision
      mainImg
    }
  }
  `;

const nestedProjectQuery = `
query project($id:ID!){
  project(id:$id){
    comments{
			id
    	projectId
      text
    }
  }
}
`;

const nestedPhotoQuery = `
query project($id:ID!){
  project(id:$id){
    photos{
      id
      projectId
      url
      description
      title
    }
  }
}
`;

const addProjectMutation = `
  mutation addProject($data: ProjectInput!){
    addProject(data:$data){
      userId
      private
      name
      description
      category
      mainImg
    }
  }
  `;

const updateProjectMutation = `
    mutation updateProject($data: UpdateProjectInput!){
        updateProject(data:$data){
        id
        userId
        name
        description
        category
        mainImg
        }
    }
    `;

const deleteProjectMutation = `
    mutation deleteProject($id:ID!){
      deleteProject(id:$id)
    }
    `;

describe('Projects Resolvers 🌸', () => {
  it('Gets all projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: projectsQuery,
    });
    expect(res).toMatchObject({
      data: {
        projects,
      },
    });
  });

  it('Gets 1 Project 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: projectQuery,
      variables: {
        id: '1',
      },
    });
    expect(res).toMatchObject({
      data: {
        project,
      },
    });

    const failedRes = await query({
      query: projectQuery,
      variables: {
        id: '7',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No project with this id exists... 💩'
    );
  });

  it('Checks nested with comments 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: nestedProjectQuery,
      variables: {
        id: '1',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        project: nestedProject,
      },
    });

    const failedRes = await query({
      query: nestedProjectQuery,
      variables: {
        id: '10',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No project with this id exists... 💩'
    );
  });

  it('Checks nested with photo 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: nestedPhotoQuery,
      variables: {
        id: '1',
      },
    });
    expect(res).toMatchObject({
      data: {
        project: nestedPhoto,
      },
    });

    const failedRes = await query({
      query: nestedPhotoQuery,
      variables: {
        id: '10',
      },
    });
    // console.log('Failed response ***', failedRes.errors[0].message);
    expect(failedRes.errors[0].message).toMatch(
      'No project with this id exists... 💩'
    );
  });

  it('Adds projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: addProjectMutation,
      variables: {
        data: {
          userId: 'abc1225475645456',
          private: true,
          name: 'testing',
          description: 'i am a tester for the update',
          category: 'Web Design',
          mainImg: 'wwwkjhbnkjnbcxc',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        addProject,
      },
    });
  });

  it('Updates projects 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: updateProjectMutation,
      variables: {
        data: {
          id: '3',
          userId: 'abc1225475645456',
          name: 'testing updates',
          description: 'i am a tester for the update again',
          category: 'UI Design',
          mainImg: 'wwwkjhbnkjnbcxcasdf',
        },
      },
    });
    // console.log('TEST RESPONSE ***', res);
    expect(res).toMatchObject({
      data: {
        updateProject,
      },
    });
  });

  it('Deletes project 🤡', async () => {
    const { query } = createTestClient(server);
    const res = await query({
      mutation: deleteProjectMutation,
      variables: {
        id: '3',
      },
    });

    // console.log('TEST RESPONSE ***', res);

    expect(res).toMatchObject({
      data: {
        deleteProject: true,
      },
    });
  });
});
