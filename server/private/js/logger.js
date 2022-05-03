const {writeToFile} = require("./writeFile");
const path = require("path");
const { date } = require("joi");

const logger = {}

logger.log = async (message, type) => {
    const builtMess = logger.buildLogMessage(message,type);
    if(await writeToFile( path.join(__dirname, "..", "logs", "log.txt"), builtMess, 'a+' )) {
        console.log("Successfully saved log");
    }
}

logger.buildLogMessage = (message, type) => {
    mess = "";
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "."
                    + (currentdate.getMonth()+1)  + "." 
                    + currentdate.getFullYear() + " "  
                    + (currentdate.getHours() < 10 ? "0"+currentdate.getHours() : currentdate.getHours()) + ":"  
                    + (currentdate.getMinutes() < 10 ? "0"+currentdate.getMinutes() : currentdate.getMinutes()) + ":" 
                    + (currentdate.getSeconds() < 10 ? "0"+currentdate.getSeconds() : currentdate.getSeconds())

    mess += ""+datetime;
    mess += " [ " + type + " ]";
    switch(type) {
        case "info": 
            return mess += "    : " + message + "\n";
        case "warning":
            return mess += " : " + message + "\n";
        case "error":
            return mess += "   : " + message + "\n";
    }
}

module.exports = logger;