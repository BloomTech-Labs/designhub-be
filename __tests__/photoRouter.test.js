const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/photo/projects';

beforeEach(async () => {    
    await db.seed.run();
  });
  afterAll(async () => {    
    await db.seed.run();
    await db.destroy(); 
  });

describe('photoRouter', () => {
  describe('POST / createProjectPhoto', () => {
    it('should return 400 if url is not in body', () => {
      return request(server)
        .post(`${ENDPOINT}/`)        
        .send({
            projectId: 2
        })        
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return 201 if photo is newly created', () => {      
      return request(server)
        .post(`${ENDPOINT}/`)
        .send({             
            projectId: 2,
            url: ' ',
            description: 'test case',
            title: 'testing 1 2 3'
             
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /:id getPhotoById', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get(`${ENDPOINT}/one/2`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 400 if id is not in db', () => {
      return request(server)
        .get(`${ENDPOINT}/one/33957857458475847584758475847`)
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('GET /:id getPhotosByProjectId', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get(`${ENDPOINT}/2`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return 400 if id is not in db', () => {
      return request(server)
        .get(`${ENDPOINT}/33957857458475847584758475847`)
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('DELETE /:id deletePhotoById', () => {
    
    it('should return 200 if photo was successfully deleted', () => {
      return request(server)
        .delete(`${ENDPOINT}/1`)
        .then(res => {
          expect(res.status).toBe(200);
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
   


