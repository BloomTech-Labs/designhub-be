const request = require('supertest');
const server = require('../../server');
const go = require('../../resources/utils/crud');

const ENDPOINT = '/api/v1/projects';

describe('userProjectsRouter', () => {
    describe('POST / createProject', () => {
        it('should return 201 if successful', () => {
            return request(server)
                .post(`${ENDPOINT}/`)
                .send({ userId: 1, name: 'Design Session' })
                .then(res => expect(res.status).toBe(201))
        });
        it('should return 400 if project not created', () => {
            return request(server)
                .post(`${ENDPOINT}/`)
                .send({})
                .then(res => expect(res.status).toBe(400))
        });
    });
    describe('GET / getProjectById', () => {
        it('should return 200 if successful', () => {
            return request(server)
                .get(`${ENDPOINT}/1`)
                .then(res => expect(res.status).toBe(200));
        });
        it('should return 404 if project id not found', () => {
            return request(server)
                .get(`${ENDPOINT}/100`)
                .then(res => expect(res.status).toBe(404));
        });
        it('should return 400 if id is not given correctly', () => {
            return request(server)
                .get(`${ENDPOINT}/id`)
                .then(res => expect(res.status).toBe(400));
        });
    })
});