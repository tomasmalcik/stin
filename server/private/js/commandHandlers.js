const readFile = require("../js/readFile");
const fs = require("fs");
const commandHandlers = {};


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

commandHandlers.handleEURHistory = async () => {
    let data = await readFile("./private/files/historyEURdata.json", "json");
    if(!data) {
        return "No history is present yet..";
    }
    
    return commandHandlers.buildHistoryTable(data);

}

commandHandlers.buildHistoryTable = (data) => {
    var table = "<table class='historyTable'> <tr><th>Datum</th> <th>Kurz</th></tr>"
    const keys = Object.keys(data);
    keys.reverse().forEach(key =>  {
        table += `<tr> <td>${key}</td> <td>${data[key].course}</td>  </tr>`;
    });
    table += "</table>";
    return table;
}

module.exports = commandHandlers;