import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {render, fireEvent, getByTestId} from '@testing-library/react' 
import '@testing-library/jest-dom/extend-expect'

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
    it("should render without crashing", () => {
        const div = document.createElement("div");
        div.id = "root";
        document.body.appendChild(div);
        require("./index");
        expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
    });
      
    it("should render the app inside div which has root id", () => {
      expect(global.document.getElementById("root")).toBeDefined();
    });
    
    it("should render App component", () => {
      expect(App).toBeDefined();
    });

    it("should contain wrapper div", () => {
        const { container } = render(<Messanger />);
        expect(getByTestId(container, "wrapper")).toBeInTheDocument();
    });
});