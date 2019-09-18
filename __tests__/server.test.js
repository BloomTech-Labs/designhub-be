const request = require('supertest');
const server = require('../server');

// initial test
describe('/ Test route', () => {
  it('• should return status 200', done => {
    return request(server)
      .get('/')
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
