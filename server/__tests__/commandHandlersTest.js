const commandHandlers = require("../private/js/commandHandlers");
const {REG_TIME_FORMAT} = require("../private/js/constants");
const mock = require("mock-fs");
const readFile = require("../private/js/readFile");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

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

        
    });

    describe("Testing of name handler", () => {
        test("Should return server name", async () => {
            const res = await commandHandlers.handleName();
            expect(res).toMatch("My name is El Botterino What's yours ?");
        })
    });

    describe("Testing of eur history handler", () => {
        test("Should return history table for euro - NOT WORKING", async () => {
            var data = await commandHandlers.handleEURHistory();
            expect(data).not.toBe(false);
        });

        test("Should return 'No history is present yet..'", async () => {
            
            mock({
                "./private/files/historyEURData.json": mock.file({
                    content: ''
                })
            });
            
            var data = await commandHandlers.handleEURHistory();
            expect(data).toBe('No history is present yet..');
            mock.restore();
        });

        test("Should return table with one row", () => {
            const mockData = {
                "22.02.2022": {
                    "course": "25.55",
                    "code": "CZK",
                    "currency": "CZK"
                }
            }
            const data = commandHandlers.buildHistoryTable(mockData);
            expect(data).toMatch(/22.02.2022/);
            expect(data).toMatch(/25.55/);
        });
    });

    describe("Testing of eur handler", () => {
        test("Should return value of eur", async () => {
            const res = await commandHandlers.handleEUR();
            expect(res).toMatch(/course of EUR/);
        });

        test("Should return that EUR data could not be fetched", async () => {
            mock({
                "./private/files/historyEURData.json": mock.file({
                    content: ''
                })
            });
            const res = await commandHandlers.handleEUR("./private/files/historyEURData.json");
            expect(res).toMatch(/Could not/);
            mock.restore();
        });
    });
})