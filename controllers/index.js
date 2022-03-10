const router = require('express').Router();
const signUp = require("./api/signup");
const login = require("./api/login");
const artwork = require("./api/artworks");

router.use("/signUp", signUp);
router.use("/login", login);
router.use("/artwork", artwork);
router.use((req, res) => {
    res.status(400).end();
});
module.exports = router;