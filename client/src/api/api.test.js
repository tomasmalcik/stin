import {getResponse, isHtml} from "./getResponse";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("Test API calls and utility functions", () => {
    describe("Test isHtml method", () => {
        test("Should return true for string <p>a</p>", () => {
            const tested = "<p>a</p>"
            expect(isHtml(tested)).toBeTruthy();
        });
        test("Should return false for string a", () => {
            const tested = "a"
            expect(isHtml(tested)).toBeFalsy();
        });
        test("Should return false for string < pepe >", () => {
            const tested = "< pepe >"
            expect(isHtml(tested)).toBeFalsy();
        });
    });

    describe("Test getResponse method", () => {
        
        const mock = new MockAdapter(axios);

        test("Should return string that contains /bot/", async () =>{
            const data = {
                message: "My name is El Boterino, what's yours ?"
            }
            mock.onGet('/api/sendCommand/what name').reply(200, data);

            // Call getResponse function
            const res = await getResponse("what name");
            expect(res).toMatch(/name/);
        })

        test("Should return invalid command", async () => {
            const data = {
                message: "Invalid"
            }
            mock.onGet('/api/sendCommand/invalid').reply(400, data);
            
            const res = await getResponse("invalid");
            expect(res).toMatch(/Invalid/);
        });

        test("Should return html component", async () => {
            const data = {
                message: "<table> </table>"
            }

            mock.onGet("/api/sendCommand/show history eur").reply(200, data);

            const res = await getResponse("show history eur");
            console.log(res);
            expect(isHtml(res.props.content)).toBeTruthy();
        })
    })
})