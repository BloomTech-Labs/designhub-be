const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/users';

describe('userRouter', () => {
  describe('POST / createUser', () => {
    it('should return 422 if sub is not in body', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({})
        .then(res => {
          expect(res.status).toBe(422);
        });
    });

    beforeEach(() => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: 'auth0|5d83b8d3d8e1cf0df49647e3' });
    });

    it('should return 200 if User already created', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: 'auth0|5d83b8d3d8e1cf0df49647e3' })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 201 if User newly is created', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: '1337' })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
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
