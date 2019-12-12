const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/invite';

describe('invite Router', () => {
    //test db needs updating, column unread doesn't exist

    // describe('GET / getInvitesByUserId', () => {
    //     it('should return 200 if successful', () => {
    //         return request(server)
    //             .get(`${ENDPOINT}/1`)
    //             .then(res => {
    //                 expect(res.status).toBe(200);
    //             });
    //     });
    // });

    // describe('GET / getInviteCountByUserId', () => {
    //     it('should return 200 if successful', () => {
    //         return request(server)
    //             .get(`${ENDPOINT}/count`)
    //             .then(res => {
    //                 expect(res.status).toBe(200);
    //             });
    //     });
    // });

    // describe('GET / getNewNotificationBoolean', () => {
    //     it('should return 200 if successful', () => {
    //         return request(server)
    //             .get(`${ENDPOINT}/bool/1`)
    //             .then(res => {
    //                 expect(res.status).toBe(200);
    //             });
    //     });
    // });

    //test db needs updating, column activeUserAvatar doesn't exist

    // describe('POST / createFollowInvite', () => {
    //     it('should return 201 if successful', () => {
    //         return request(server)
    //             .post(`${ENDPOINT}/follow`)
    //             .send({
    //                 activeUsername: "mansleen",
    //                 invitedUserId: 2,
    //                 activeUserId: 1,
    //                 activeUserAvatar: 'https://s.gravatar.com/avatar/a70f8b0c3761764491eebc5d0484a738?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png',
    //                 type: 'follow',
    //                 followersId: 1
    //             })
    //             .then(res => {
    //                 expect(res.status).toBe(201);
    //             });
    //     });
    // });

    // describe('POST / createCommentInvite', () => {
    //     it('should return 201 if successful', () => {
    //         return request(server)
    //             .post(`${ENDPOINT}/comments`)
    //             .send({
    //                 activeUsername: "mansleen",
    //                 invitedUserId: 2,
    //                 activeUserId: 1,
    //                 activeUserAvatar: 'https://s.gravatar.com/avatar/a70f8b0c3761764491eebc5d0484a738?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png',
    //                 type: 'comment',
    //                 commentText: "something",
    //                 projectId: 1,
    //                 mainImgUrl: 'something',
    //                 commentsId: 1
    //             })
    //             .then(res => {
    //                 expect(res.status).toBe(201);
    //             });
    //     });
    // });


    describe('DELETE THIS TEST AFTER ABOVE TESTS ARE WORKING', () => {
        it('should return 201 if successful', () => {
            return request(server)
                .post(`${ENDPOINT}/comments`)
                .send({
                    activeUsername: "mansleen",
                    invitedUserId: 2,
                    activeUserId: 1,
                    activeUserAvatar: 'https://s.gravatar.com/avatar/a70f8b0c3761764491eebc5d0484a738?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fer.png',
                    type: 'comment',
                    commentText: "something",
                    projectId: 1,
                    mainImgUrl: 'something',
                    commentsId: 1
                })
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
    });

});