const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/star';

beforeEach(async () => {    
    await db.seed.run();
  });
  afterAll(async () => {    
    await db.seed.run();
    await db.destroy(); 
  });

describe('starRouter', () => {
  describe('POST / createStar', () => {
    /*it('should return 400 if project id is not in body', () => {
      return request(server)
        .post(`${ENDPOINT}/`)
        .set("Content-Type", "application/json")
        .send({})        
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return 400 if user id is not in body', () => {
        return request(server)
          .post(`${ENDPOINT}/`)
          .send({})
          .then(res => {
            expect(res.status).toBe(400);
          });
    });*/
    
    it('should return 201 if star is newly is created', () => {
      const randomNum = Math.random();
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({ 
            userId: 1,
            projectId: 1
             
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /:id getStarredByUserId', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get(`${ENDPOINT}/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 400 if id is not in db', () => {
      return request(server)
        .get(`${ENDPOINT}/${455545879621}`)
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('DELETE /unstar/:id deleteStar', () => {
    
    it('should return 404 if id does not exist', () => {
      return request(server)
        .delete(`${ENDPOINT}/unstar/13377894587552`)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('GET / getProjectStarCount', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/count/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('GET / getProjectStarCount', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/count/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('GET / getStarStatus', () => {
    it('should return 200', () => {
      return request(server)
        .get(`${ENDPOINT}/status/1/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });  

});
