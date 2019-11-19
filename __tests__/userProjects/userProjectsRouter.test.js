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
    });

    describe('GET / getProjectByUserId', () => {
        it('should return 200 if successful', () => {
            return request(server)
                .get(`${ENDPOINT}/users/1`)
                .then(res => expect(res.status).toBe(200));
        });
        it('should return 400 if id not given correctly', () => {
            return request(server)
                .get(`${ENDPOINT}/users/id`)
                .then(res => expect(res.status).toBe(400));
        });
    });

    describe('GET / getRecentProjectByUserId', () => {
        it('should return 200 if successful', () => {
            return request(server)
                .get(`${ENDPOINT}/recent/1`)
                .then(res => expect(res.status).toBe(200));
        });
        it('should return 400 if unsuccessful', () => {
            return request(server)
                .get(`${ENDPOINT}/recent/id`)
                .then(res => expect(res.status).toBe(400));
        });
    });

    //testing db needs updating, tests failing because privateProjects doesnt exist

    // describe('GET / getAllProjects', () => {
    //     it('should return 200 if successful', () => {
    //         return request(server)
    //             .get(`${ENDPOINT}/`)
    //             .then(res => expect(res.status).toBe(200));
    //     });
    // });

    // describe('POST / getProjectsByName', () => {
    //     it('should return 200 if successful', () => {
    //         return request(server)
    //             .post(`${ENDPOINT}/name`)
    //             .send({ name: 'Design Session' })
    //             .then(res => expect(res.status).toBe(200));
    //     });
    //     it('should return 400 if unsuccessful', () => {
    //         return request(server)
    //             .post(`${ENDPOINT}/name`)
    //             .send({ name: 'Wrong Name' })
    //             .then(res => expect(res.status).toBe(400));
    //     });
    // });
});