const downloader = require('../private/js/downloadData');
const readFile = require('../private/js/readFile');
const mockdate = require("mockdate");

describe("Downloader and utility functions testing.", () => {
    test("Should download data, return true", async () => {
        const res = await downloader.downloadData("https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=6725F461EB18FCE30107706921C61012?date=");
        expect(res).not.toBe(false)
        
    });

    test("Should not download data, should return false", async () => {
        const res = await downloader.downloadData("https://www.cnb.cz/cs/financni-y/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=6725F461EB18FCE30107706921C61012?date=");
        expect(res).toBe(false);
    });

    test("Should reject promise in download method, throw error", async () => {
        return await expect(downloader.download("nonexistent")).rejects.toThrow()
    });

    test("Should export date in [year,month, day] format, expecting 01.06.2015", () => {
        mockdate.set('2015-06-01');
        var date = downloader.getDate();
        expect(date[0]).toEqual('2015');
        expect(date[1]).toEqual('06');
        expect(date[2]).toEqual('01');
        mockdate.reset();
    });

   
})