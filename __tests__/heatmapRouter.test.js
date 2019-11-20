const request = require('supertest');
const server = require('../server');

const ENDPOINT = '/api/v1/heatmap';


describe('heatmapRouter', ()=>{

    describe('POST / createHeatmap', ()=>{

        // it('should return 400 if userId isnt included in body',()=>{
        //     return request(server)
        //     .post(`${ENDPOINT}/`)
        //     .send({ projectId: 1, 
        //             contribution:"This is a design."})
        //     .then(res => {
        //       expect(res.status).toBe(400);
        //     });
        // });

        // it('should return 201 if user creates heatmap', ()=>{
        //     return request(server)
        //     .post(`${ENDPOINT}/`)
        //     .send({ userId: 1, 
        //             projectId: 1, 
        //             contribution:"This is a design."})
        //     .then(res => {
        //       expect(res.status).toBe(201);
        //     });
        // });
    });

    describe('GET /:id getHeatMapsFromUserId', ()=>{

        it('should return a 400 if id isnt attached to the req.params', ()=>{
            return request(server)
            .get(`${ENDPOINT}/wrongid`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });

        it('should return a 200 if heatmap is successfully GOT.', ()=>{
            return request(server)
            .get(`${ENDPOINT}/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    describe('GET /all/:id getAllHeatmapsFromUserId', ()=>{

        it('should return a 400 if id isnt attached to the req.params', ()=>{
            return request(server)
            .get(`${ENDPOINT}/all/`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });

        it('should return a 200 if all heatmaps are successfully GOT.', ()=>{
            return request(server)
            .get(`${ENDPOINT}/all/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    describe('GET /count/:id getTotalHeatmapContributions', ()=>{
        
        it('should return a 400 if id isnt attached to the req.params', ()=>{
            return request(server)
            .get(`${ENDPOINT}/count/`)
            .then(res => {
              expect(res.status).toBe(400);
            });
        });

        it('should return a 200 if all heatmap contributions are successfully GOT.', ()=>{
            return request(server)
            .get(`${ENDPOINT}/count/1`)
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });

    describe('DELETE /:id deleteHeatmapById', ()=>{

        it('should return a 200 if heatmap is successfully deleted', ()=>{
            return request(server)
            .delete(`${ENDPOINT}/1`)
            .then(res => {
                expect(res.status).toBe(200);
            });
        })
    });

    // Not implemented in application, no documentation currently.
    // describe('PUT /:id editHeatmap', ()=>{

    //     it('should return a 200 if heatmap is successfully edited.', ()=>{
    //         return request(server)
    //         .put(`${ENDPOINT}/1`)
    //         .send({ userId: 1, 
    //                 projectId: 2, 
    //                 contribution:"This is a design."})
    //         .then(res => {
    //           expect(res.status).toBe(201);
    //         });
    //     });
    // });

});
