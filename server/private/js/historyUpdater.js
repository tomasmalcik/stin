/* Update history file */
const readFile = require("./readFile");
const { downloadData } = require("./downloadData");
const {writeToFile} = require("./writeFile");


function updateHistoryData() {
    downloadData() //Download data
    var downloadedData =  parseDownloaded(readFile("./private/files/downloaded.txt", "txt"), "EUR");   //Load data from file
    var historyData = readFile("./private/files/historyEURData.json", "json");
    if(downloadedData != false &&  !(downloadedData[0] in historyData) ) {
        historyData[downloadedData[0]] = {
            "currency": "CZK",
            "course": downloadedData[1][downloadedData[1].length-1],
            "code": "CZK"
        }
        if(writeToFile("./private/files/historyEURData.json", JSON.stringify(historyData), "w")) {
            console.log("LOG: Data updated successfully");
        }
    }
}


function parseDownloaded(data, curr) {
    //console.log(data);
    if(!data) {
        return false;
    }

    data = data.split("\n");

    if(!data.includes("měna")) {
        return false;
    }

    const date = data[0].split(" ")[0];

    const line = data.find(element => {
        if (element.includes(curr)) {
          return element
        }
    });

    return [date, line.split("|")];   


}

module.exports = {updateHistoryData};
