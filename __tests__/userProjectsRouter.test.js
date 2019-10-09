const request = require('supertest');
const server = require('../server');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/projects';

const RANDOM_ID = Math.floor(Math.random() * 10000);
const NEW_PROJECT = {
  userId: 1,
  name: 'Test Project'
};

describe('userProjectsRouter', () => {
  describe('POST / createProject', () => {
    it('should return 422 if userId is not in body', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({})
        .then(res => {
          expect(res.status).toBe(422);
        });
    });

    it('should return 201 if new project is created', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send(NEW_PROJECT)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /:id getProjectById', () => {
    it('should return 200 OK', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ ...NEW_PROJECT, id: RANDOM_ID }) // specify random hardcoded id
        .then(() => {
          return request(server)
            .get(`${ENDPOINT}/${RANDOM_ID}`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    it('should return 404 if id is not in db', () => {
      return request(server)
        .get(`${ENDPOINT}/1337`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('GET / getAllProjects', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('GET /users/:userId/ getProjectByUserId', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/users/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 404 when user does not exist', () => {
      return request(server)
        .get(`${ENDPOINT}/users/${RANDOM_ID}`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('GET /recent/:userId/ getRecentProjectByUserId', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/recent/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 404 when user does not exist', () => {
      return request(server)
        .get(`${ENDPOINT}/recent/${RANDOM_ID}`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('POST /name getProjectsByName', () => {
    const nameBody = { projectName: NEW_PROJECT.name };
    it('should return 200', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .send(NEW_PROJECT)
        .then(() => {
          return request(server)
            .post(`${ENDPOINT}/name`)
            .send(nameBody)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    it('should return 422 when no body', () => {
      return request(server)
        .post(`${ENDPOINT}/name`)
        .send({})
        .then(res => {
          expect(res.status).toBe(422);
        });
    });

    it('should return 404 name does not exist', () => {
      return request(server)
        .post(`${ENDPOINT}/name`)
        .send({ projectName: 'DOES NOT EXIST' })
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('PUT /:id updateProjectById', () => {
    const changes = {
      ...NEW_PROJECT,
      name: 'changed name'
    };
    it('should return 200', () => {
      return request(server)
        .put(`${ENDPOINT}/1`)
        .send(changes)
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

    it('should return 404 for user not in db', () => {
      return request(server)
        .put(`${ENDPOINT}/540000454`)
        .send(changes)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('DELETE /:id deleteProjectById', () => {
    it('should return 200', () => {
      return go.createOne('user_projects', 'id', NEW_PROJECT).then(([id]) => {
        return request(server)
          .delete(`${ENDPOINT}/${id}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    it('should return 404 if id does not exist', () => {
      return request(server)
        .delete(`${ENDPOINT}/${455500000}`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });
});
