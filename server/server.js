if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const readFile = require("./private/js/readFile");
const cron = require("node-cron")
const { updateHistoryData } = require("./private/js/historyUpdater")
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

//Load commands
var commands = readFile("./private/files/commands.json", "json");
if(!commands) { //Handle error
    console.error("Could not read commands.. trying backup file");
    commands = readFile("./backup/files/commands.json", "json");

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


//Cron schedule download
cron.schedule('30 11-14 * * 1-5', updateHistoryData)


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

//Try downloader
//downloadData()
//Run app
app.listen(5000)

