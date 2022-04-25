const router = require("express").Router()
const antiXSS = require("../private/js/utility")

router.get("/api/test", (req, res) => {
    res.status(200).send("Working..");
})

router.post("/api/test",antiXSS, (req, res) => {
    res.status(200).json(req.body.hobbies[0].swimming);
})

module.exports = router