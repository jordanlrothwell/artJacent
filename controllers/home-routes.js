const router = require("express").Router();
const session = require("express-session");
const { Artwork, User } = require("../models");

// Send all items in the artwork table to /
router.get("/", async (req, res) => {
  let orderedArt;
  try {
    const dbArtData = await Artwork.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const art = dbArtData.map((artwork) => artwork.get({ plain: true }));

    router.get("/", async (req, res) => {
      const user_id = req.session.user_id;
      try {
        const dbUserData = await User.findOne({
          where: {
            // get the user id from the session
            id: user_id,
          },
          // return the user where the user id matches the session
        });

        const user = dbUserData.map((user) => user.get({ plain: true }));

        const newArtArray = [];
        const userLon = user[0].longitude;
        const userLat = user[0].latitude;

        // get the distance for every post
        for (let i = 0; i < art.length; i++) {
          const lon = art[i].user[0].longitude;
          const lat = art[i].user[0].latitude;

          // convert coordinates to radians
          const lon1 = (userLon * Math.PI) / 180;
          const lon2 = (lon * Math.PI) / 180;
          const lat1 = (userLat * Math.PI) / 180;
          const lat2 = (lat * Math.PI) / 180;

          // haversine formula
          const dlon = lon2 - lon1;
          const dlat = lat2 - lat1;
          const a =
            Math.pow(Math.sin(dlat / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
          const c = 2 * Math.asin(Math.sqrt(a));

          // radius of earth in km
          const radius = 6371;

          const distance = c * radius;

          //calculate the result
          const newPostObject = {
            "image": art[i].image,
            "distance": distance,
          }
          newArtArray.push(newPostObject);
        }


          const merge = (left, right) => {
            let sortedArr = []; // the sorted elements will go here
        
          while (left.length && right.length) {
            // insert the smallest element to the sortedArr
            if (left[0] < right[0]) {
              sortedArr.push(left.shift());
            } else {
              sortedArr.push(right.shift());
            }
          }
        
          // use spread operator and create a new array, combining the three arrays
          return [...sortedArr, ...left, ...right];
        }

        const mergeSort = (arr) => {
            const half = arr.length / 2;
        
          // the base case is array length <=1
          if (arr.length <= 1) {
            return arr;
          }
        
          const left = arr.splice(0, half); // the first half of the array
          const right = arr;
          const orderedArt = merge(mergeSort(left), mergeSort(right));
          return orderedArt;
        }
        
        
        // Set up a test case for the algorithm
        orderedArt = mergeSort(newArtArray)
        
      } catch (err) {
        res.status(400).json(err);
      }
    });

    res.render("homepage", {orderedArt, loggedIn: false });
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
          attributes: ["name"],
        },
      ],
    });

    const art = dbArtData.map((artwork) => artwork.get({ plain: true }));

    res.render("profile", { art, loggedIn: false });
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
});

module.exports = router;
