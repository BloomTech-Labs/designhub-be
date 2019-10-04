const db = require('../data/dbConfig');
const go = require('../resources/utils/crud');

describe('userController', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    return db.seed.run();
  });

  describe('createUser', () => {
    it('shoudl ceate new user', () => {});
  });
});
