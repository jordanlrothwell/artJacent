const router = require("express").Router();
const { Artwork, User } = require("../models");
const { withAuth, distance  } = require("../utils");
const { findByPk } = require("../models/User");

// Send all items in the artwork table to /
router.get("/", async (req, res) => {
  const postsArray = [];

  try {
    const dbArtData = await Artwork.findAll({
      include: [
        {
          model: User,
        },
      ],
    });


    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id
      }
    })

    // Get the current user's location
    const user = dbUserData.get({plain: true});
    const userLatitude = user.latitude;
    const userLongitude = user.longitude;
    
    // Get all artworks
    const art = dbArtData.map((artwork) => artwork.get({ plain: true }));
    console.log(art);

    // For ecery artwork, find the distance of the post to the user
    for (let i=0; i<art.length; i++) {
      const postLatitude = art[i].user.latitude;
      const postLongitude = art[i].user.longitude;

      const obj = {
        name: art[i].name,
        image: art[i].image,
        user: art[i].user.name,
        distance: distance(userLatitude, userLongitude, postLatitude, postLongitude)
      }
      postsArray.push(obj);
    }

    console.log(postsArray);

    res.render("feed", { postsArray, logged_in: req.session.logged_in });
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
