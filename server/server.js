if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const bodyParser = require("body-parser")


//Middleware imports
const {recurse} = require("./private/js/utility");

//Routes
const apiRouter = require("./routes/api")


//App sets
app.set('trust proxy', 1);

//App uses
app.use(express.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}))

// XSS protection
app.use((req, res, next) => { //XSS protection.
    //Iterate through the whole request body using recursion
    recurse(req.body);
    next() 
})

//Routes middleware
app.use(apiRouter);

//Run app
app.listen(process.env.PORT || 3000)