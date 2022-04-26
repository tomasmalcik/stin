const commandHandlers = require("../private/js/commandHandlers");
const {REG_TIME_FORMAT} = require("../private/js/constants");

describe("Testing behavior of command handlers", () => {
    describe("Testing of time handler", () => {
        test("Should return date in format hh:mm:ss", async () => {
            const res = await commandHandlers.handleTime().split(" ");
            expect(REG_TIME_FORMAT.test(res[res.length-1])).toBe(true);
        });

        test("Should return exact date: 15:15:15", async () => {
            const res = await commandHandlers.handleTime("December 14, 2026 15:15:15").split(" ");
            expect(res[res.length-1]).toEqual("15:15:15");
        });

        test("Should return NaN when invalid date is set", async () => {
            const res = await commandHandlers.handleTime("December 14, 2026 105:15:15").split(" ");
            expect(res[res.length-1]).toEqual("NaN:NaN:NaN");           
        });

        //Hours
        test("getTime method - check if output data are equal to h: 01", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 01:20:10");
            expect(res[0]).toEqual("01");
        });

        test("getTime method - check if output data are equal to h: 10", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 10:20:10");
            expect(res[0]).toEqual("10");
        });

        //Minutes
        test("getTime method - check if output data are equal to m: 20", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 01:20:10");
            expect(res[1]).toEqual("20");
        });

        test("getTime method - check if output data are equal to m: 01", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 01:01:10");
            expect(res[0]).toEqual("01");
        });

        //Seconds
        test("getTime method - check if output data are equal to s: 10", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 01:20:10");
            expect(res[2]).toEqual("10");
        });

        test("getTime method - check if output data are equal to s: 01", async () => {
            const res = await commandHandlers.getTime("December 14, 2026 01:20:01");
            expect(res[0]).toEqual("01");
        });

        
    })
})