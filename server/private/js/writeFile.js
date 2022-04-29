const fs = require("fs");

function writeToFile(path, string, flags) {

    try {
        fs.writeFileSync(path, string, {flag: flags});
        return true;
    }catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {writeToFile};