const request = require('supertest');
const server = require('../server');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/users';

describe('userRouter', () => {
  describe('POST / createUser', () => {
    it('should return 422 if sub is not in body', async () => {
      const res = await request(server)
        .post(`${ENDPOINT}/`)
        .send({});

      expect(res.status).toBe(422);
    });

    beforeEach(async () => {
      await request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: 'auth0|5d83b8d3d8e1cf0df49647e3' });
    });

    it('should return 200 if User already created', async () => {
      const res = await request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: 'auth0|5d83b8d3d8e1cf0df49647e3' });
      expect(res.status).toBe(200);
    });

    it('should return 201 if User newly is created', async () => {
      const randomNum = Math.random();
      const res = await request(server)
        .post(`${ENDPOINT}/`)
        .send({ sub: `${randomNum}` });

      expect(res.status).toBe(201);
    });
  });

  const userStatus = res => {
    return expect(res.status).toBe(200);
  };

  describe('GET /:id getUserById', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get(`${ENDPOINT}/1`);
      userStatus(res);
    });

    it('should return 400 if id is not in db', async () => {
      const res = await request(server).get(`${ENDPOINT}/1337`);
      expect(res.status).toBe(404);
    });
  });

  describe('GET /check/:username getUserByUsername', () => {
    it('should return 200', async () => {
      const res = await request(server).get(`${ENDPOINT}/check/eriklambert`);
      userStatus(res);
    });

    it('should return 204 when user does not exist', async () => {
      const res = await request(server).get(`${ENDPOINT}/check/0248`);
      expect(res.status).toBe(204);
    });
  });

  describe('GET / getAllUsers', () => {
    it('should return 200', async () => {
      const res = await request(server).get(`${ENDPOINT}/`);
      expect(res.status).toBe(200);
    });
  });

  describe('PUT /:id updateUserById', () => {
    it('should return 200', async () => {
      const res = await request(server)
        .put(`${ENDPOINT}/1`)
        .send({ auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3' });
      expect(res.status).toBe(200);
    });

    it('should return 422 for missing fields', async () => {
      const res = await request(server)
        .put(`${ENDPOINT}/1`)
        .send({});

      expect(res.status).toBe(422);
    });

    it('should return 400 for user not in db', async () => {
      const res = await request(server)
        .put(`${ENDPOINT}/439734`)
        .send({ auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /:id deleteUserById', () => {
    it('should return 200', async () => {
      const [id] = await go.createOne('users', 'id', { auth0Id: 'testUser' });
      const res = await request(server).delete(`${ENDPOINT}/${id}`);

      expect(res.status).toBe(200);
    });

    it('should return 404 if id does not exist', async () => {
      const res = await request(server).delete(`${ENDPOINT}/${4555}`);

      expect(res.status).toBe(404);
    });
  });
});
