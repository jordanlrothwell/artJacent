const router = require("express").Router();
const feed = require("./feed");
const painting = require("./painting");

router.use("/", feed);
router.use("/painting", painting);

module.exports = router;
