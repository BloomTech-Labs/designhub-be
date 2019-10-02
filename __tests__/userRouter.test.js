const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/users';

describe('userRouter', () => {
  describe('POST / createUser', () => {
    it('', () => {});
  });

  describe('GET / getUserById', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get(`${ENDPOINT}/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 400 if id is not in db', () => {
      return request(server)
        .get(`${ENDPOINT}/1337`)
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });
});
