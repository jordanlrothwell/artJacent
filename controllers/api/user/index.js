const router = require("express").Router();
const login = require("./login");
const logout = require("./logout");
const signUp = require("./signUp");

router.use("/login", login);
router.use("/logout", logout);
router.use("/signup", signUp);

module.exports = router;
