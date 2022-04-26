function parseCommand(req, res, next) {
    
    // Go through json commands, check if keyword is contained
    const val = recursion(req.params.command, req.commands);
    if(val == null) {
        req.command = false;
    }
    else {
        req.command = val;
    }
    next();
}

function recursion(command, commands) {
    let val;
    for(const key in commands) {
        if(command.toLowerCase().includes(key)) {
            if(commands[key] && typeof commands[key] == 'object') {
                val = recursion(command, commands[key]); //If object is found, recurse through again
            }else {
                return commands[key]; //handler is found
            }
        }
    }
    return val;
}

module.exports = parseCommand;