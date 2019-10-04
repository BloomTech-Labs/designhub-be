const request = require('supertest');
const server = require('../server');
const go = require('../resources/utils/crud');

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
      const randomNum = Math.random();
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: `${randomNum}` })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /:id getUserById', () => {
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
          expect(res.status).toBe(404);
        });
    });
  });

  describe('GET /check/:username getUserByUsername', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/check/eriklambert`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 204 when user does not exist', () => {
      return request(server)
        .get(`${ENDPOINT}/check/0248`)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });
  });

  describe('GET / getAllUsers', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('PUT /:id updateUserById', () => {
    it('should return 200', () => {
      return request(server)
        .put(`${ENDPOINT}/1`)
        .send({ auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3' })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 422 for missing fields', () => {
      return request(server)
        .put(`${ENDPOINT}/1`)
        .send({})
        .then(res => {
          expect(res.status).toBe(422);
        });
    });

    it('should return 400 for user not in db', () => {
      return request(server)
        .put(`${ENDPOINT}/439734`)
        .send({ auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3' })
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('DELETE /:id deleteUserById', () => {
    it('should return 200', () => {
      return go
        .createOne('users', 'id', { auth0Id: 'testUser' })
        .then(([id]) => {
          return request(server)
            .delete(`${ENDPOINT}/${id}`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    it('should return 404 if id does not exist', () => {
      return request(server)
        .delete(`${ENDPOINT}/${4555}`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });
});
