const router = require("express").Router()

router.get("/api/test", (req, res) => {
    res.send("Working..");
});

module.exports = router