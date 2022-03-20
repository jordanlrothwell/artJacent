const router = require("express").Router();
const { Artwork, User } = require("../models");
const { withAuth } = require("../utils");
const { findByPk } = require("../models/User");

// Send all items in the artwork table to /
router.get("/", async (req, res) => {
  try {
    const dbArtData = await Artwork.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const art = dbArtData.map((artwork) => artwork.get({ plain: true }));
    console.log(art);

    res.render("feed", { art, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the profile of the user after login
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Artwork }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", { ...user, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Send the user to the hame page when logged in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
