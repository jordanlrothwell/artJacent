const router = require("express").Router();
const { Artwork, User } = require("../models");
const { withAuth, distance, mergeSort } = require("../utils");
const { findByPk } = require("../models/User");

// Send all items in the artwork table to /
router.get("/", async (req, res) => {
  const orderedPostArray = [];
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
        id: req.session.user_id,
      },
    });

    // Get the current user's location
    const user = dbUserData.get({ plain: true });
    const userLatitude = user.latitude;
    const userLongitude = user.longitude;

    // Get all artworks
    const art = dbArtData.map((artwork) => artwork.get({ plain: true }));

    // For every artwork, find the distance of the post to the user
    const customObj = async () => {
      const postsArray = [];
      for (let i = 0; i < art.length; i++) {
        const postLatitude = art[i].user.latitude;
        const postLongitude = art[i].user.longitude;

        const obj = {
          name: art[i].name,
          image: art[i].image,
          user: art[i].user.name,
          distance: distance(
            userLatitude,
            userLongitude,
            postLatitude,
            postLongitude
          ),
          id: art[i].id
        };
        postsArray.push(obj);
      }
      await orderedArray(postsArray);
    };

    const orderedArray = async (arr) => {
      const mergeDistancesArray = [];
      for (let i = 0; i < arr.length; i++) {
        const distance = arr[i].distance;
        const name = arr[i].name
        mergeDistancesArray.push([distance, name]);
      }
      console.log(mergeDistancesArray);
      const orderedArray = mergeSort(mergeDistancesArray);

      console.log(orderedArray);

      orderPosts(orderedArray, arr);

    };

    const orderPosts = async (arr, posts) => {
      for (let i = 0; i< arr.length; i++) {
        const array = arr[i];
        const name = array[array.length - 1]
        for (let j = 0; j < posts.length; j++) {
          if (name == posts[j].name) {
            orderedPostArray.push(posts[j]);
          }
        }
      }
    }

    customObj();
    console.log(orderedPostArray);

    res.render("feed", { orderedPostArray, logged_in: req.session.logged_in });

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
