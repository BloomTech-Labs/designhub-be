const db = require('../../data/dbConfig');
const go = require('../../resources/utils/crud');

beforeEach(async () => {
    // Re-seed before all tests to ensure that each test will work with a clean set of data
    await db.seed.run();
});
afterAll(async () => {
    // Re-seed after all tests in this test suite to ensure that the next test suite will work with a clean set of data
    await db.seed.run();
    await db.destroy(); // Necessary to prevent connections from not closing (which could eventually clog the Postgres database if left unchecked)
});

const PROJECTID = 1;
const PROJECTNAME = "Design Session"
const EXPECTED_PROJECT = {
    id: 1,
    userId: 1,
    username: "eriklambert",
    privateProjects: false,
    name: "Design Session",
    description: "A New Project",
    mainImg: "https://my-photo-bucket-123.s3.us-east-2.amazonaws.com/2/9b23c230-f50e-11e9-b873-ed5982a4b782.jpeg"
}

const TEST_PROJECT = {
    userId: 1,
    name: PROJECTNAME,
}

const CREATED_PROJECT = project => ({
    id: PROJECTID,
    userId: 1,
    name: PROJECTNAME,
    teamId: null,
    private: false,
    description: null,
    figma: null,
    invision: null,
    mainImg: null,
    created_at: project[0].created_at,
    updated_at: project[0].updated_at,
});

describe('userProjectsController', () => {
    describe('createProject', () => {
        let id;
        beforeEach(async () => {
            id = await go.createOne('user_projects', 'id', TEST_PROJECT);
        })
        it('should create a new project and return with expected data', async () => {
            const project = await go.getById('user_projects', id[0]);
            expect(project).toHaveLength(1);
            expect(project[0].name).toBe(EXPECTED_PROJECT.name);
            expect(project[0]).toEqual(CREATED_PROJECT(project));
        });
    });
});