const fs = require("fs");
const https = require("https");

async function downloadData() {
    const file = fs.createWriteStream("./private/files/downloaded.txt")
    const builtURL = buildURL("https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt;jsessionid=6725F461EB18FCE30107706921C61012?date=")
    const req = https.get(builtURL, async (res) => {
        res.pipe(file);
        if(res.statusCode != 200) {
             status = false;
        }

        await file.on("finish", async () => {
            file.close();
        })
    })
}

function buildURL(url) {
    newUrl = url;
    const now = getDate();
    newUrl += now[2] + ".";
    newUrl += now[1] + ".";
    newUrl += now[0];

    return url;
}

function getDate() {
    const now = new Date();
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDay();

    year = year.toString();
    month = (month < 10) ? "0"+month : month;
    day = (day < 10) ? "0"+day : day;

    return [year, month, day];
}

module.exports = {downloadData, getDate, buildURL}