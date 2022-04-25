const striptags = require("striptags")

function antiXSS(req, res, next) {
    function recurse(obj) {
        for (const key in obj) { 
            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') { //Another document, start recursion again
                    recurse(value, key);
                }else if(typeof value === 'boolean') { //Ignore boolean values
                    continue
                }else {
                    obj[key] = striptags(obj[key]) //Strip tags from string in req.body
                }
            }
        }
    }
    recurse(req.body);
    next() 
}

module.exports = antiXSS;