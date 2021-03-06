import React     from 'react'
import ReactDOM  from 'react-dom'
import Sidebar   from './Sidebar'

describe("Test sidebar component", () => {
    test("Should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Sidebar />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})