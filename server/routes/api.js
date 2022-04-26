const router = require("express").Router()
const commandParser = require("../private/middlewares/parseCommand");


router.get("/api/test", (req, res) => {
    res.status(200).send("Working..");
})

router.post("/api/test", (req, res) => {
    res.status(200).json(req.body);
})

router.get("/api/sendCommand/:command", commandParser, (req, res) => {
    res.send(req.command);
});

module.exports = router