const router = require("express").Router()
const commandParser = require("../private/middlewares/parseCommand");


router.get("/api/test", (req, res) => {
    res.status(200).send("Working..");
})

router.post("/api/test", (req, res) => {
    res.status(200).json(req.body.hobbies[0].swimming);
})

router.get("/api/sendCommand:command", commandParser, (req, res) => {

});

module.exports = router