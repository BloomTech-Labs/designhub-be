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
});