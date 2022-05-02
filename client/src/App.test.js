import React     from 'react'
import ReactDOM  from 'react-dom'
import App       from './App'

describe("Testing of App.js", () => {
    test("Should generate properly", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})