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

    res.render("feed", { art, loggedIn: req.session.loggedIn });
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
    res.render("profile", { ...user, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Send the user to the hame page when logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// take the user to a specific artwork
router.get("/artwork/:id", async (req, res) => {
  try {
    const artworkData = await Artwork.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
      ],
    });

    const artwork = artworkData.get({ plain: true });

    res.render("artwork", {
      ...artwork,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
