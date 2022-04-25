const mockRequest = (body) => ({
    body: body
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const antiXSSMiddleware = require('../private/js/utility');

describe("Test", () => {
    test("PLS", async () => {
        const req = mockRequest({test: "<p>test</p>"});
        const res = mockResponse();
        await antiXSSMiddleware(req, res, () => {});
        expect(req.body.test).toEqual("test");
    })
})