const request = require("supertest");
const express =  require('express');

const router = require('../routes/api');

const app = new express();
app.use(express.json())
app.use('/', router);

describe('Behavior of routes', () => {
    test('Reaching GET /api/test should return Working..', async () => {
        const res = await request(app).get('/api/test');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Working..');
    });

    test("Reaching POST /api/test with empty body should return req.body as {}", async () => {
        const res = await request(app).post("/api/test").send({test: "test"});
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual({
            test: "test"
        });
    })
});