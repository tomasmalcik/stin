const commandHandlers = {};


commandHandlers.handleTime = (date) => { //Used for testing purposes
    let now = commandHandlers.getTime(date);

 
    return "It is currently " +  now[0] + ":" + now[1] + ":" + now[2];
}


commandHandlers.getTime = (date) => {
    const now = (date != null) ? new Date(date) : new Date();
    let    hours   = (now.getHours() < 10) ? "0"+now.getHours() : ""+now.getHours();
    let    minutes = (now.getMinutes() < 10) ? "0"+now.getMinutes() : ""+now.getMinutes();
    let    seconds = (now.getSeconds() < 10) ? "0"+now.getSeconds() : ""+now.getSeconds();   
    return [hours, minutes, seconds]; 
}

module.exports = commandHandlers;