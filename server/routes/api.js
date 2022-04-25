const router = require("express").Router()

router.get("/api/test", (req, res) => {
    res.status(200).send("Working..");
})

router.post("/api/test", (req, res) => {
    res.status(200).json(req.body.hobbies[0].swimming);
})

module.exports = router