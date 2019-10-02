const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/users';

describe('userRouter', () => {
  describe('GET / getUserById', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get(`${ENDPOINT}/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 422 for missing id in params', () => {
      return request(server)
        .get(`${ENDPOINT}/`)
        .then(res => {
          expect(res.status).toBe(422);
        });
    });
  });
});
