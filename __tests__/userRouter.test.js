const request = require('supertest');
const server = require('../server');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/users';
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FTXpPVGMyUlRZME5VWkNOVGsyUTBFMk56SkdOMFU0TXpVNE5VRkJOVUZFTXpZM09UYzBRUSJ9.eyJpc3MiOiJodHRwczovL3RlYW0tZGVzaWduaHViLmF1dGgwLmNvbS8iLCJzdWIiOiJMUVU2dzJBQVpZVHdibXU1RjFkeG1KdVRZcHExTlJEYkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZWFtLWRlc2lnbmh1Yi5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU3NDE3NTc5MSwiZXhwIjoxNTc0MjYyMTkxLCJhenAiOiJMUVU2dzJBQVpZVHdibXU1RjFkeG1KdVRZcHExTlJEYiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pQtEl9Tpw63yiUvjAa3mu_AoC7jdic6B7725ub4PnbnICsS6t_n4mhJEw669lH6XQBaMMZaqASusLBON4bUXaT441PXzn982SwOWpTyEGQzB-CQYTR33UwKu5wYzUinteO_wOj1gTg7fYzvRWEAdCn0a6k8GjxVaLPX8MGAV0BxNnLl22wijP-gYBR4rnUDK0YJ2kC72t15H8nqISzfcigh9aSQJRZwTOucimC1mnjjhgl12VWEKTFEZ393lZuFBi4yQaJ8kagyM-z2QGZJNlW6VLlhg4pe2g00EyviTU_-NGMUNszLXH1SuYZBhoFwoJTR45g3O_TFeLcjLjMUMtg'

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
          // console.log(res)
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
        // .set({user: 'auth0|5d83b8d3d8e1cf0df49647e3'})
        .set('Content-Type','application/json')
        .send({ auth0Id: 'auth0|5d83b8d3d8e1cf0df49647e3', firstName: 'mansleen '})
        .then(res => {
          expect(res.status).toBe(200);
          // console.log(res)
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
