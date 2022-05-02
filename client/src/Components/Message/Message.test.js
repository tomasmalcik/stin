import React     from 'react'
import ReactDOM  from 'react-dom'
import Message   from './Message'
import {render, fireEvent, getByTestId} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'

describe("Testing of Message component", () => {
    test("Should render successfully", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Message data={{type: "ai", message: "test"}}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test("Should render message-box for bot", () => {
        const {getByTestId} = render(<Message data={{type: "ai", message: "test"}}/>);
        expect(getByTestId("message-span")).toHaveTextContent("Bot");
    });

    test("Should render message-box for user", () => {
        const {getByTestId} = render(<Message data={{type: "user", message: "test"}}/>);
        expect(getByTestId("message-span")).toHaveTextContent("You");
    });
})