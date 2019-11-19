const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/followers';

describe('followersRouter', ()=>{

    describe('POST / createFollow', ()=>{

        it('should return 400 if followingId is not included in body', ()=>{
            return request(server)
            .post(`${ENDPOINT}/`)
            .send({})
            .then(res => {
              expect(res.status).toBe(400);
            });
        })

        it('should return 400 if followedId is not included in the body', ()=>{
            return request(server)
            .post(`${ENDPOINT}/`)
            .send({ followedId: ''})
            .then(res => {
              expect(res.status).toBe(400);
            });
        })

        it('should return 201 if user creates follow', ()=>{
            return request(server)
            .post(`${ENDPOINT}/`)
            .send({ followingId: 1, followedId: 2})
            .then(res => {
              expect(res.status).toBe(201);
            });
        });
    });

    describe('GET /following/:id getFollowingByUserId', ()=>{

        it('should return status of 200 to confirm following is available', ()=>{
            return request(server)
              .get(`${ENDPOINT}/following/1`)
              .then(res => {
                expect(res.status).toBe(200);
              });
        });

        it('should return 400 if id is not in db', () => {
            return request(server)
              .get(`${ENDPOINT}/following/wrongid`)
              .then(res => {
                expect(res.status).toBe(400);
              });
        });
    });

    describe('GET /count/following/:id getFollowingCount', ()=>{
        
        it('should return a status of 200 to confirm following count is received',()=>{
            return request(server)
            .get(`${ENDPOINT}/count/following/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });

        it('should return a 400 if req.params.id doesnt exist',()=>{
            return request(server)
            .get(`${ENDPOINT}/count/following/wrongid`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });
    });

    describe('GET /followers/:id getFollowersByUserId', ()=>{
        
        it('should return a status of 200 to confirm followers are available', ()=>{
            return request(server)
            .get(`${ENDPOINT}/followers/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });

        it('should return a 400 if req.params.id doesnt exist',()=>{
            return request(server)
            .get(`${ENDPOINT}/followers/wrongid`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });
    });

    describe('GET /count/followers/:id getFollowersCount', ()=>{
        
        it('should return a status of 200 to confirm followers count is available',()=>{
            return request(server)
            .get(`${ENDPOINT}/count/followers/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });

        it('should return a 400 if req.params.id doesnt exist',()=>{
            return request(server)
            .get(`${ENDPOINT}/count/followers/wrongid`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });

    });

    describe('POST /unfollow/:id unfollow', ()=>{

        it('should return 400 if followingId is not included in body', ()=>{
            return request(server)
            .post(`${ENDPOINT}/unfollow/1`)
            .send({})
            .then(res => {
              expect(res.status).toBe(400);
            });
        })

        it('should return 400 if followedId doesnt exist', ()=>{
            return request(server)
            .post(`${ENDPOINT}/unfollow/wrongid`)
            .send({ followingId: 2})
            .then(res => {
              expect(res.status).toBe(400);
            });
        })

        it('should return 200 if user creates unfollow', ()=>{
            return request(server)
            .post(`${ENDPOINT}/unfollow/2`)
            .send({ followingId: 1})
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

});