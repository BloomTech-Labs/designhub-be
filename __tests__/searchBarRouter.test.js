const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/search';

describe('searchbar Router', () => {
    describe('POST / search', () => {
        it('should return 400 if searchText is not in body', () => {
            return request(server)
                .post(`${ENDPOINT}/`)
                .send({})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });

        it('should return 200 if successful', () => {
            return request(server)
                .post(`${ENDPOINT}/`)
                .send({ searchText: 'design' })
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});