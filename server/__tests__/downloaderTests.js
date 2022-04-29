const downloader = require('../private/js/downloadData');
const readFile = require('../private/js/readFile');
const mockdate = require("mockdate");
describe("Downloader and utility functions testing.", () => {
    test("Should download data", async () => {
        downloader.downloadData();
        let data = readFile("./private/files/downloaded.txt", "txt");
        
        expect(data.includes("měna")).toBe(true);
    });

    test("Should build URL with current date", () => {

    })
})