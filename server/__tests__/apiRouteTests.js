const request = require("supertest");
const express =  require('express');

const router = require('../routes/api');

const app = new express();
app.use('/', router);

describe('Behavior of GET /api/test', () => {
    test('Should return Working..', async () => {
        const res = await request(app).get('/api/test');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Working..');
    })
});