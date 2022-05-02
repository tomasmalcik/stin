const readFile = require("../js/readFile");
const fs = require("fs");
const commandHandlers = {};
const path = require("path");


commandHandlers.handleTime = (date) => { //Used for testing purposes
    let now = commandHandlers.getTime(date);

 
    return "It is currently " +  now[0] + ":" + now[1] + ":" + now[2];
}


commandHandlers.getTime = (date) => {
    const now = (date != null) ? new Date(date) : new Date();
    let    hours   = (now.getHours() < 10) ? "0"+now.getHours() : ""+now.getHours();
    let    minutes = (now.getMinutes() < 10) ? "0"+now.getMinutes() : ""+now.getMinutes();
    let    seconds = (now.getSeconds() < 10) ? "0"+now.getSeconds() : ""+now.getSeconds();   
    return [hours, minutes, seconds]; 
}

commandHandlers.handleName = () => {
    return "My name is El Botterino What's yours ?";
}

commandHandlers.handleEURHistory = async (pa = path.join(__dirname, "..", "files", "historyEURData.json")) => {
    console.log(__dirname)
    let data = await readFile(pa, "json");
    console.log(data);
    if(!data) {
        console.log(data);
        return "No history is present yet..";
    }
    
    return commandHandlers.buildHistoryTable(data);

}

commandHandlers.buildHistoryTable = (data) => {
    var table = "<table class='historyTable'> <tr><th>Date</th> <th>Course</th></tr>"
    const keys = Object.keys(data);
    keys.reverse().forEach(key =>  {
        table += `<tr> <td>${key}</td> <td>${data[key].course} ${data[key].currency}</td>  </tr>`;
    });
    table += "</table>";
    return table;
}

commandHandlers.handleEUR = async (pa = path.join(__dirname, "..", "files", "historyEURData.json")) => {
    var course = await commandHandlers.getCurrencyData(pa, "EUR");
    return "Todays course of EUR is "+ course;

}

commandHandlers.getCurrencyData = async (path, type) => {
    let split = path.split(" ")
    let builtPath = split[0] + type + split[1];
    let data = await readFile(builtPath, "json");
    if(!data) {
        return "Could not load EUR data..";
    }
    var keys = Object.keys(data);
    var last = keys[keys.length - 1];
    return data[last].course;
}

commandHandlers.handleHelp = () => {
    return `Try asking for the current time.. like Hey, what time it is? or whats my name? or to show you a course of euro, or perhabs what the history of eur is`;
}

module.exports = commandHandlers;