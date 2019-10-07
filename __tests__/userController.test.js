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

const AUTH0ID = 'testUser|1';
const USERID = 7;
const USERNAME = 'mansleen';
const EXPECTED_USER = {
  id: 2,
  auth0Id: 'google-oauth2|115383560506192673006',
  username: 'mansleen',
  email: 'mansleen@designhub.com',
  phoneNumber: '8005550129',
  firstName: 'Michael',
  lastName: 'Vansleen',
  location: 'Denver, CO',
  bio:
    'I love designing and always looking for ways to improve and innovate. 🤓 #Usersmatter! #LambdaBound #UXEngineer',
  website: 'https://mansleen.io',
  avatar: 'https://avatars3.githubusercontent.com/u/40153979?s=400&v=4',
  created_at: null
};
const EXPECTED_USERNAME = { username: 'mansleen' };

const CREATED_USER = user => ({
  id: USERID,
  auth0Id: AUTH0ID,
  username: null,
  email: null,
  phoneNumber: null,
  firstName: null,
  lastName: null,
  location: null,
  bio: null,
  website: null,
  avatar: null,
  created_at: user[0].created_at
});

let TEST_USER = {
  auth0Id: AUTH0ID
};

describe('userController', () => {
  describe('createUser', () => {
    let id;
    beforeEach(async () => {
      id = await go.createOne('users', 'id', TEST_USER);
    });
    it('should create new user and return with expected data ', async () => {
      const user = await go.getById('users', id[0]);
      expect(id[0]).toBe(USERID);
      expect(user).toHaveLength(1);
      expect(user[0].auth0Id).toBe(AUTH0ID);
      expect(user[0]).toEqual(CREATED_USER(user));
    });

    it('should return user if user already exists', async () => {
      const user = await db('users')
        .select('*')
        .where('auth0Id', AUTH0ID);
      expect(user).toHaveLength(1);
      expect(user[0].auth0Id).toBe(AUTH0ID);
      expect(user[0]).toEqual(CREATED_USER(user));
    });
  });

  describe('getUserById', () => {
    it('should return length of 0 if user does not exist', async () => {
      const data = await go.getById('users', 23);
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
    it('should return expected data if user exists', async () => {
      const data = await go.getById('users', 2); // mansleen
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual(EXPECTED_USER);
      expect(data[0]).toMatchObject(EXPECTED_USER);
      expect(data[0]).toBeTruthy();
    });
  });

  describe('getUserByUsername', () => {
    it('should return an empty array when user is not found', async () => {
      const data = await go.getByUsername(
        'users',
        'Does not exist',
        'username'
      );
      expect(data).toHaveLength(0);
      expect(data).toEqual([]);
    });
    it('should return expected data when username exists', async () => {
      const data = await go.getByUsername('users', USERNAME, 'username');
      expect(data).toHaveLength(1);
      expect(data[0]).toEqual({ username: 'mansleen' });
      expect(data[0]).toMatchObject(EXPECTED_USERNAME);
      expect(data[0]).toBeTruthy();
    });
  });

  describe('getAllUsers', () => {
    it('should return all users with expected results', async () => {
      const data = await go.getMany('users').orderBy('id', 'asc');
      expect(data).toHaveLength(6);
      expect(data[1]).toEqual(EXPECTED_USER);
      expect(data[1]).toMatchObject(EXPECTED_USER);
      expect(data[1]).toBeTruthy();
    });
  });

  describe('updateUserById', () => {
    const change = {
      ...EXPECTED_USER,
      lastName: 'Jordan'
    };
    it('should update user with expected data', async () => {
      const user = await go.updateById('users', change, EXPECTED_USER.id);
      const data = await db('users').where('lastName', change.lastName);
      expect(user).toBe(1);
      expect(data).toHaveLength(1);
      expect(data[0].lastName).toBe(change.lastName);
    });
  });

  describe('deleteUserById', () => {
    it('should delete Added user and get expected results', async () => {
      const [id] = await go.createOne('users', 'id', TEST_USER);
      const addedUser = await go.getById('users', id);

      expect(id).toBe(USERID);
      expect(addedUser).toHaveLength(1);
      expect(addedUser[0].auth0Id).toBe(AUTH0ID);

      const deleted = await go.destroyById('users', id);
      const deletedUser = await go.getById('users', id);

      expect(deleted).toBe(1);
      expect(deletedUser).toHaveLength(0);
      expect(deletedUser[0]).toBeUndefined();
    });
  });
});
