const fs = require("fs");


function readFile(path, type) {

    fs.readdirSync("./private/files/").forEach(file => {
        console.log(file);
      })

    //Check if path exists
    if(fs.existsSync(path)) {
        //works
        let raw = fs.readFileSync(path, 'utf8');
        
        switch(type){ //Read based on type
            case "txt":
                return raw;
            case "json":
                return JSON.parse(raw);
        }
    }else {
        console.log("Cant find.." + path)
        return false;
        
    }
}

module.exports = readFile;