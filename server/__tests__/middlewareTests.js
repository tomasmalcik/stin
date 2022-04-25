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

describe("Testing of request body XSS cleaner", () => {
    test("Should replate html tags inside of request body", async () => {
        const req = mockRequest({test: "<p>test</p>"});
        const res = mockResponse();
        await antiXSSMiddleware(req, res, () => {});
        expect(req.body.test).toEqual("test");
    });

    test("Should ignore boolean values inside of request body", async () => {
        const req = mockRequest({test: true});
        const res = mockResponse();
        await antiXSSMiddleware(req, res, () => {});
        expect(req.body.test).toEqual(true);
    })

    test("Should recurse through nested JSON object inside of request body", async () => {
        const req = mockRequest({
            test: true,
            name: "Peter",
            hobbies: [
                {swimming: "<p>fun</p>"},
                {etc: "working"}
            ]
        });
        const res = mockResponse();
        await antiXSSMiddleware(req, res, () => {});
        expect(req.body.hobbies[0].swimming).toEqual("fun");       
    })
})