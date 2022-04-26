const fs = require("fs");


function readFile(path) {
    //Check if path exists
    if(fs.existsSync(path)) {
        //works
        let raw = fs.readFileSync(path);
        return JSON.parse(raw);
    }else {
        return false;
    }
}

module.exports = readFile;