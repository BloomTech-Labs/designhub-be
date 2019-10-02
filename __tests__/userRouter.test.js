const request = require('supertest');
const server = require('../server');

describe('userRouter', () => {
  describe('GET / getUserById', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get('/api/v1/users/1')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
