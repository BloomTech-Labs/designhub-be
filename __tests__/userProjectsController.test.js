const db = require('../data/dbConfig');
const go = require('../resources/utils/crud');

beforeEach(async () => {
  // Re-seed before all tests to ensure that each test will work with a clean set of data
  await db.seed.run();
});
afterAll(async () => {
  // Re-seed after all tests in this test suite to ensure that the next test suite will work with a clean set of data
  await db.seed.run();
  await db.destroy(); // Necessary to prevent connections from not closing (which could eventually clog the Postgres database if left unchecked)
});

const TEST_PROJECT = {
  userId: 1,
  name: 'Test Project'
};
const PROJECT_ID = 1;
const CREATED_PROJECT = project => {
  return {
    id: PROJECT_ID,
    userId: 1,
    teamId: null,
    private: false,
    name: 'Test Project',
    description: null,
    figma: null,
    invision: null,
    mainImg: null,
    created_at: project.created_at,
    updated_at: project.updated_at
  };
};

describe('userProjectsController', () => {
  describe('createProject', () => {
    it('should create new project ', async () => {
      const id = await go.createOne('user_projects', 'id', TEST_PROJECT);
      expect(id[0]).toBe(PROJECT_ID);
    });
  });

  describe('getProjectById', () => {
    it('should return length of 0 if project does not exist', async () => {
      const data = await go.getById('user_projects', 23);
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
    it('should return expected data if project exists', async () => {
      const id = await go.createOne('user_projects', 'id', TEST_PROJECT);
      const data = await go.getById('user_projects', id[0]);
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual(CREATED_PROJECT(data[0]));
      expect(data[0]).toMatchObject(CREATED_PROJECT(data[0]));
      expect(data[0]).toBeTruthy();
    });
  });

  describe('getProjectByUserId', () => {
    it('should return an empty array when user is not found', async () => {
      const data = await go.getByUserId('user_projects', 9999999);
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
    it('should return expected data when project exists', async () => {
      await go.createOne('user_projects', 'id', TEST_PROJECT);
      const data = await go.getByUserId('user_projects', TEST_PROJECT.userId);
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual(CREATED_PROJECT(data[0]));
      expect(data[0]).toMatchObject(CREATED_PROJECT(data[0]));
      expect(data[0]).toBeTruthy();
    });
  });

  describe('getRecentProjectByUserId', () => {
    it('should return an empty array when user is not found', async () => {
      const data = await go.getByUserId('user_projects', 9999999);
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
    it('should return expected data when project exists', async () => {
      await go.createOne('user_projects', 'id', TEST_PROJECT);
      const data = await go.getByUserId('user_projects', TEST_PROJECT.userId);
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual(CREATED_PROJECT(data[0]));
      expect(data[0]).toMatchObject(CREATED_PROJECT(data[0]));
      expect(data[0]).toBeTruthy();
    });
  });

  describe('getAllProjects', () => {
    it('should return all projects with expected results', async () => {
      await go.createOne('user_projects', 'id', TEST_PROJECT);
      const data = await db('user_projects')
        .select(
          'user_projects.id',
          'user_projects.userId',
          'u.username',
          'user_projects.private',
          'user_projects.name',
          'user_projects.description',
          'user_projects.figma',
          'user_projects.invision',
          'user_projects.mainImg',
          'user_projects.created_at',
          'user_projects.updated_at'
        )
        .orderBy('id', 'asc')
        .innerJoin('users as u', 'u.id', '=', 'user_projects.userId');
      expect(data).toHaveLength(1);
      expect(data[0].username).toBe('eriklambert');
      expect(data[0].name).toBe('Test Project');
    });
  });

  describe('getProjectsByName', () => {
    it('should return project by name', async () => {
      await go.createOne('user_projects', 'id', TEST_PROJECT);
      const data = await db('user_projects').where(
        'name',
        'like',
        `%${TEST_PROJECT.name}%`
      );
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual(CREATED_PROJECT(data[0]));
      expect(data[0]).toMatchObject(CREATED_PROJECT(data[0]));
      expect(data[0]).toBeTruthy();
    });

    it('should get expected results if name is not in db', async () => {
      const data = await db('user_projects').where(
        'name',
        'like',
        `%NAME DOES NOT EXIST%`
      );
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
  });

  describe('updateProjectById', () => {
    const change = {
      ...TEST_PROJECT,
      name: 'TEST CHANGED'
    };
    it('should update project with expected data', async () => {
      const [id] = await go.createOne('user_projects', 'id', TEST_PROJECT);

      const project = await go.updateById('user_projects', change, id);
      const data = await db('user_projects').where('name', change.name);
      expect(project).toBe(1);
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe(change.name);
    });
  });

  describe('deleteProjectById', () => {
    it('should delete Added project and get expected results', async () => {
      const [id] = await go.createOne('user_projects', 'id', TEST_PROJECT);
      const addedProject = await go.getById('user_projects', id);

      expect(id).toBe(PROJECT_ID);
      expect(addedProject).toHaveLength(1);
      expect(addedProject[0].name).toBe(TEST_PROJECT.name);

      const deleted = await go.destroyById('user_projects', id);
      const deletedUser = await go.getById('user_projects', id);

      expect(deleted).toBe(1);
      expect(deletedUser).toHaveLength(0);
      expect(deletedUser[0]).toBeUndefined();
    });
  });
});
