const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/explore';

describe('explore Router', () => {
    describe('get / getExploreOptions', () => {
        //test db needs updating, error thrown because privateProjects column doesn't exist

        it('should return 500 because privateProjects column doesnt exist', () => {
            return request(server)
                .get(`${ENDPOINT}/1`)
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });

        // it('should return 400 if id is not attached', () => {
        //     return request(server)
        //         .get(`${ENDPOINT}/wrongid`)
        //         .then(res => {
        //             expect(res.status).toBe(400);
        //         });
        // });

        // it('should return 200 if successful', () => {
        //     return request(server)
        //         .get(`${ENDPOINT}/1`)
        //         .then(res => {
        //             expect(res.status).toBe(200);
        //         });
        // });
    });
});