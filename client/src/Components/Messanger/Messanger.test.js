import React     from 'react'
import ReactDOM  from 'react-dom'
import Messanger   from './Messanger'
import {render, fireEvent, getByTestId} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'


describe("Testing of Messanger component", () => {
    test("Should render successfully", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Messanger />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test("Should render no messages when app starts", () => {
        const {getByTestId} = render(<Messanger />)
        expect(getByTestId("test-empty")).toHaveTextContent(/Start/);
    })

    test("Should render messages", () => {
        
    });
})