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

commandHandlers.handleEUR = async (pa = path.join(__dirname, "..", "files", "history Data.json")) => {
    var course = await commandHandlers.getCurrencyData(pa, "EUR");
    return "Todays course of EUR is "+ course + "CZK";

}

commandHandlers.getCurrencyData = async (pa, type) => {
    let split = pa.split(" ")
    let builtPath = split[0] + type + split[1];
    let data = await readFile(builtPath, "json");
    if(!data) {
        return "Could not load EUR data..";
    }
    var keys = Object.keys(data);
    var last = keys[keys.length - 1];
    return data[last].course;
}

commandHandlers.handleRecommendEUR = async (pa = path.join(__dirname, "..", "files", "historyEURData.json")) => {
    // Load data
    historyData = await readFile(pa, "json");

    //Get last 3 days
    let keys = Object.keys(historyData).reverse().slice(0,3);
    let vals = [];
    keys.forEach(key => {
        let val = parseFloat(historyData[key].course.replace(",", "."));
        vals.push(val);
    });

    //Build arithmetic avg
    let avg = commandHandlers.buildAVG(vals);
    
    let stats = commandHandlers.checkRecommendation(vals, avg);

    let response = ` Latest 3 courses: <br/> - ${vals[2]} CZK <br/> - ${vals[1]} CZK <br/> -${vals[0]} CZK <br/><br/>`;
    response += (stats[1] < 0) ? `In total, EUR increased by ${stats[1]*-1}` : `In total, EUR decreased by ${stats[1]} `
    if(stats[0]) {
        //Should recommend
        response += `<br/> <br/>`;
        response += `<b>Conclusion</b>: You should <b style='color: green;'>definetly buy EUR right now</b>, because it either is still decreasing or overall did not increate by more than 10% of average value `;
    }else {
        response += `<br/> <br/>`;
        response += `<b>Conclusion</b>: You shoud <b style='color: red;'>definetly NOT buy EUR right now</b>, because it increased by more than 10% of average`;
    }

    return response;
}

commandHandlers.checkRecommendation = (vals, avg) => {
    let inc = avg / 10; // 10 % increace / decrease
    let fullDifference = 0.0;
    for(let i = vals.length-1; i > 0; i--) {
        let diff = vals[i] - vals[i-1];
        fullDifference += diff;
        if(fullDifference < inc*-1) { //If total difference is larger than 10% of avg
            return [false, fullDifference];
        }
    }

    return [true, fullDifference]; //Decreasing, same, not increasing by 10%;
}

commandHandlers.buildAVG = (vals) => {
    let sum = 0.0;
    vals.forEach(val => {
        sum += val;
    })
    return sum / vals.length
}

commandHandlers.handleHelp = () => {
    return `Try asking for the current time.. like Hey, what time it is? or whats my name? or to show you a course of euro, or perhabs what the history of eur is`;
}

module.exports = commandHandlers;