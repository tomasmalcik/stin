const fs = require("fs");

async function writeToFile(path, string) {
    ret = false;
    await fs.promises.writeFile(path, string, {encoding: 'utf8'})
               .then(() => {
                   ret =  true;
               })
               .catch(err => {
                   ret =  false;
               })

    return ret;
}

module.exports = {writeToFile};