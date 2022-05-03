/* Update history file */
const readFile = require("./readFile");
const { downloadData } = require("./downloadData");
const {writeToFile} = require("./writeFile");
const logger = require("./logger");


async function updateHistoryData() {
    var downloadedData = await downloadData("https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=6725F461EB18FCE30107706921C61012?date=")


    if(!downloadedData) {
        logger.log("Could not download data", "error");
        return false;
    }

    var parsed = parseDownloaded(downloadedData, "EUR");
    var historyData = readFile("./private/files/historyEURData.json", "json");

    if(downloadedData != false &&  !(parsed[0] in historyData) ) {
        historyData[parsed[0]] = {
            "currency": "CZK",
            "course": parsed[1][parsed[1].length-1],
            "code": "CZK"
        }
        const ret = await writeToFile("./private/files/historyEURData.json", JSON.stringify(historyData));
        if(ret) {
            logger.log("Successfully saved new data");
        }else {
            logger.log("Could not save data", "error");
        }
    }
}

function parseDownloaded(data, curr) {

    data = data.split("\n");

    if(!data[1].includes("měna")) {
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
