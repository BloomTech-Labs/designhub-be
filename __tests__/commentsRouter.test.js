const request = require('supertest');
const server = require('../server');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/comments';

describe('commentsRouter', () => {
  describe('POST /photo createPhotoComment', () => {
    it('should return 400 if imageId is not attached to body', () => {
      return request(server)
      .post(`${ENDPOINT}/photo`)
      .send({})
      .then(res => {
        expect(res.status).toBe(400);
      })
    })

    it('should return 400 if userId is not attached to body', () => {
      return request(server)
      .post(`${ENDPOINT}/photo`)
      .send({
        imageId: 1
      })
      .then(res => {
        expect(res.status).toBe(400);
      })
    })
  })
})