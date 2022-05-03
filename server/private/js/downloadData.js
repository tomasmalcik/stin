const fs = require("fs");
const https = require("https");
const writeFile = require('../js/writeFile')
const logger = require("./logger");

async function downloadData(url) {
    const builtURL = buildURL(url);
    var data = {};
    await download(builtURL)
    .then(res => {
        data = res; 
        logger.log("Successfully downloaded data", "info");
    })
    .catch(err => {
        console.error('Ran into error while downloading data... ');
        data.statusCode = 400;
    });

    return (data.statusCode != 200) ? false : data.body;
}

function download(url) {
    return new Promise((resolve, reject) => {
        https.get(url, async (res) => {
            data = []
            res.on('data', (chunk) => {
                data.push(chunk);
            });
    
            res.on('end', () => {
                if(res.statusCode < 200 || res.statusCode >= 300) {
                    reject('Error');
                }
                resolve({
                    statusCode: res.statusCode,
                    body: Buffer.concat(data).toString()
                })
            })

            res.on('error', (err) => {
                reject('Error');
            })
        })
    });
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

module.exports = {downloadData, getDate, buildURL, download}