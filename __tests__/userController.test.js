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

describe('userController', () => {
  describe('createUser', () => {
    it('should ceate new user', () => {});
  });
});
