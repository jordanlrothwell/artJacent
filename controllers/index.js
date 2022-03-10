const router = require('express').Router();
const signUp = require("./api/user");
const page = require("./api/page");

router.use("/api/user", signUp);
router.use("/api/page", page);
router.use((req, res) => {
    res.status(400).end();
});
module.exports = router;