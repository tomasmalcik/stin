const logger = require("../private/js/logger");
const mockdate = require("mockdate");
const { buildLogMessage } = require("../private/js/logger");

describe("Test logger", () => {
    test("Should build log message that contains info", () => {
        const mess = logger.buildLogMessage("ppp", "info");
        expect(mess).toMatch(/info/);
    });

    test("Should build log message that contains error", () => {
        const mess = logger.buildLogMessage("ppp", "error");
        expect(mess).toMatch(/error/);
    });

    test("Should build log message that contains warning", () => {
        const mess = logger.buildLogMessage("ppp", "warning");
        expect(mess).toMatch(/warning/);
    });

    test("Should return time with 03 at hours", () => {
        mockdate.set('2022-01-18T02:33:37.000Z');
        const mess = logger.buildLogMessage("ppp", "warning");
        expect(mess).toMatch(/03/);
        
        mockdate.reset();    
    })

    test("Should return time with 03 at minutes", () => {
        mockdate.set('2022-01-18T02:13:37.000Z');
        const mess = logger.buildLogMessage("ppp", "warning");
        expect(mess).toMatch(/02/);
        
        mockdate.reset();    
    });

    test("Should return time with 03 at secs", () => {
        mockdate.set('2022-01-18T12:33:03.000Z');
        const mess = logger.buildLogMessage("ppp", "warning");
        expect(mess).toMatch(/03/);
        
        mockdate.reset();    
    })
    
})