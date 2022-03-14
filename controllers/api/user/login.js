const router = require("express").Router();
const { User } = require("../../../models");

// Login as existing user
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      },
    });

    if (!dbUserData) {
      res.status(400).json({message: "No user with that email."});
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.params.password);

    if (!validPassword) {
      res.status(400).json({message: "Invalid password."});
    }

    req.session.loggedIn = true;

    res.status(200).json({user: dbUserData, message: "You are now logged in"})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;