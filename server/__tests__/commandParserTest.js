const commandParser = require("../private/middlewares/parseCommand")
const readFile = require("../private/js/readFile");

const commands = readFile("./private/files/commands.json");

const mockRequest = (command) => ({
    params: {
        command: command
    },
    commands: commands
});


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Testing of command parser method", () => {
    test("Command: what time it is? \n" +
          "      Should return: handleTime", async () => {
            const req = mockRequest('what time it is?');
            const res = mockResponse();
            await commandParser(req, res, () => {});
            expect(req.command).toEqual("handleTime");
          });
    
    test("Command: what is your name? \n" +
         "      Should return: handleName", async() => {
            const req = mockRequest('what is your name?');
            const res = mockResponse();
            await commandParser(req, res, () => {});
            expect(req.command).toEqual("handleName");
    });
    
    test("Command: non existent command? \n" +
    "      Should return: false", async() => {
       const req = mockRequest('non existent command?');
       const res = mockResponse();
       await commandParser(req, res, () => {});
       expect(req.command).toEqual(false);
    });
});