const router = require('express').Router();
const session = require('express-session');
const { Artwork, User } = require('../models');


// Send all items in the artwork table to /
router.get("/", async (req, res) => {
  try {
    const dbArtData = await Artwork.findAll({
      include: [
        { 
          model: User,
          attributes: ["name"],
        }
      ]
    });

    const art = dbArtData.map((artwork) => 
      artwork.get({plain: true})
    );

    res.render("homepage", { art, loggedIn: false });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Send the user to the hame page when logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
})

module.exports = router;