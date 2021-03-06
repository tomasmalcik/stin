const commandHandlers = require("../private/js/commandHandlers");
const {REG_TIME_FORMAT} = require("../private/js/constants");
const mock = require("mock-fs");
const p = require("path");
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
            
            var data = await commandHandlers.handleEURHistory('/private/files/historyEURData.json');
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

        test("Should return a string with help", () => {
            const res = commandHandlers.handleHelp();
            expect(res).toMatch(/Try asking/); //... Try asking what my name is ...
        })
    });

    describe("Testing of eur recommendation handler", () => {
        afterEach(() => {
            mock.restore();
        })
        test("Should build avg of 2 values: 2,4 => avg: 3", () => {
            const res = commandHandlers.buildAVG([2,4]);
            expect(res).toEqual(3);
        });

        test("Should recommend buying", () => {
            const avg = 2.3;
            const vals = [2.2,2.3,2.4];
            const res = commandHandlers.checkRecommendation(vals, avg);
            expect(res[0]).toBeTruthy();
        });

        test("Should not recommend buying", () => {
            const vals = [2.9,2.8,1.1];
            const avg = commandHandlers.buildAVG(vals);
            const res = commandHandlers.checkRecommendation(vals, avg);
            expect(res[0]).toBeFalsy();
        });

        test("Should test handler, return recommendation to buy", async () => {
            mock({
                "./foo": mock.file({
                    content: JSON.stringify({
                        "28.04.2022": {
                            "currency": "CZK",
                            "course":"24,530",
                            "code":"CZK"
                        },
                        "29.04.2022": {
                            "currency": "CZK",
                            "course":"24,605",
                            "code":"CZK"
                        },
                        "02.05.2022":{
                            "currency":"CZK",
                            "course":"24,670",
                            "code":"CZK"
                        }
                    })
                })
            })
            


            const res = await commandHandlers.handleRecommendEUR("./foo");
            expect(res).toMatch(/definetly buy/);

            mock.restore();

        })

        test("Should test handler, return recommendation not to buy", async () => {
            mock({
                "./foo": mock.file({
                    content: JSON.stringify({
                        "28.04.2022": {
                            "currency": "CZK",
                            "course":"19,530",
                            "code":"CZK"
                        },
                        "29.04.2022": {
                            "currency": "CZK",
                            "course":"24,605",
                            "code":"CZK"
                        },
                        "02.05.2022":{
                            "currency":"CZK",
                            "course":"24,670",
                            "code":"CZK"
                        }
                    })
                })
            })
            


            const res = await commandHandlers.handleRecommendEUR("./foo");
            expect(res).toMatch(/definetly NOT buy/);

            mock.restore();

        })
    })
})