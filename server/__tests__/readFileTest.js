const readFile = require("../private/js/readFile");

describe("Reading from a file", function() {
    test("Should read and transform to json", () => {
        let data = readFile("./private/files/commands.json"); //Route to fit location of function
        expect(data).toEqual(
            {
                what: {
                  time: 'handleTime',
                  name: 'handleName',
                  'exchange rate': { eur: 'handleEUR' },
                  course: { eur: 'handleEUR' }
                },
                help: 'handleHelp'
              }
        )
    });

    test("Should fail, return false", () => {
        let data = readFile("nonexistent");
        expect(data).toEqual(false);
    });
});