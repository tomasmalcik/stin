if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const readFile = require("./private/js/readFile");

//Load commands
var commands = readFile("./private/files/commands.json");
if(!commands) { //Handle error
    console.error("Could not read commands.. trying backup file");
    commands = readFile("./backup/files/commands.json");

    if(!commands) {
        throw new Error("Could not load commands... exiting");
    }

    console.log("Commands loaded");
}else {
    console.log("Commands loaded");
}

//Middleware imports
const antiXSS = require("./private/middlewares/antiXSS");

//Routes
const apiRouter = require("./routes/api")


//App sets
app.set('trust proxy', 1);

//App uses
app.use(express.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use(function(req, res, next) {
    req.commands = commands;
    next();
});

// XSS protection
app.use(antiXSS)

//Routes middleware
app.use(apiRouter);

//Run app
app.listen(process.env.PORT || 3000)