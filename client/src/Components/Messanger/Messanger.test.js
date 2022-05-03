import React     from 'react'
import ReactDOM  from 'react-dom'
import Messanger  from './Messanger'
import {render, fireEvent, getByTestId} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'


describe("Testing of Messanger component", () => {
    test("Should render successfully", () => {
        const div = document.createElement("div");
        const {getByTestId} = render(<Messanger />)
        expect(getByTestId('content')).toBeInTheDocument();
    });

    test("Should render default when app starts", () => {
        const {getByTestId} = render(<Messanger />)
        expect(getByTestId("data-empty")).toHaveTextContent(/Start/);
    })

    test("Should use hook", () => {
        const { container, rerender } = render(<Messanger />);
        const inputCommand = getByTestId(container, "command");
        const button = getByTestId(container, "send");

        const comm = "what time";

        fireEvent.change(inputCommand, { target: {value: comm} });
        fireEvent.click(button);
        rerender(<Messanger />);
        expect(window.localStorage.getItem("correspondence")).not.toBe([]);

    })

    test("Should fire toast error", () => {
        const { container, rerender } = render(<Messanger />);
        const inputCommand = getByTestId(container, "command");
        const button = getByTestId(container, "send");
        fireEvent.click(button);
        rerender(<Messanger />);
        expect(inputCommand.value).toMatch("help");
        
    });

    test("Should clear command after catching response", async () => {
        const { container, rerender } = render(<Messanger />);
        const inputCommand = getByTestId(container, "command");
        const button = getByTestId(container, "send");

        const comm = "what time";

        fireEvent.change(inputCommand, { target: {value: comm} });
        fireEvent.click(button);
        rerender(<Messanger />);
        setTimeout(() => {
            expect(inputCommand.value).toBe('');
        },2000)
               
    })

})