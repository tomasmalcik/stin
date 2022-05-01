const router = require("express").Router()
const commandParser = require("../private/middlewares/parseCommand");
const commandHandlers = require("../private/js/commandHandlers");

router.get("/api/test", (req, res) => {
    res.status(200).send("Working..");
})

router.post("/api/test", (req, res) => {
    res.status(200).json(req.body);
})

router.get("/api/sendCommand/:command?", commandParser, async (req, res) => {

    if(!req.command) {
        return res.status(400).json({
            message: "Invalid command, type help to see available commands"
        });
    }

    return res.status(200).json({
        message: await commandHandlers[req.command]()
    });
});

module.exports = router