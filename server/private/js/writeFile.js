const fs = require("fs");

async function writeToFile(path, string, flag='w') {
    ret = false;
    await fs.promises.writeFile(path, string, {encoding: 'utf8', flag: flag})
               .then(() => {
                   ret =  true;
               })
               .catch(err => {
                   ret =  false;
               })

    return ret;
}

module.exports = {writeToFile};