const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const { Artwork, User } = require("../models");

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

    // console.log(__dirname)

    // const dir = path.join(__dirname, "../", "UserImages");
    // // console.log(dir);
    // const files = fs.readdirSync(dir);
    // console.log(files);

    // const imagesArray = [];
    // for (const file of files) {
    //   imagesArray.push({
    //     name: file,
    //     image: path.join("../", "UserImages", file)
    //   })
    // }

    // console.log(imagesArray);

    res.render("feed", { art, loggedIn: false });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get the profile of the user after login
router.get("/profile", async (req, res) => {
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

    res.render("profile", { art, loggedIn: false });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Send the user to the hame page when logged in
router.get("/login", (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }
  res.render("login");
});

module.exports = router;
