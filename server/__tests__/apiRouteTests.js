const request = require("supertest");
const express =  require('express');
const readFile = require('../private/js/readFile')
const router = require('../routes/api');

const commands = readFile("./private/files/commands.json");

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
        const res = await request(app).post("/api/test").send({test: "testing"});
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual({
            test: "testing"
        });
    });

    test("Reaching GET /api/sendCommand with invalid command", async () => {
        const res = await request(app).get("/api/sendCommand/");
        expect(res.statusCode).toBe(400); //Only code is valid, message could change
    });

    test("Reaching GET /api/sendCommand/what time it is? expecting time and 200 status", async () => {
        const res = await request(app).get("/api/sendCommand/what%20time");
        expect(res.statusCode).toBe(200); // Successfully returned
    });
});