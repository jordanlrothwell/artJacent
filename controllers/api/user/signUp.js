const router = require("express").Router();
const { User } = require("../../../models");

// CREATE new user
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: req.body.password,
    });

    req.session.loggedIn = true;

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;