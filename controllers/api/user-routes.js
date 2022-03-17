const router = require("express").Router();
const { User, Artwork } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      // username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.loggedIn = true;

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.loggedIn = true;

    res.status(200).json({ user: dbUserData, message: "You are now logged in!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Send the artwork data to the client
router.get("/artwork", async (req, res) => {
  try {
    await Artwork.findAll({
      include: [
        {
          model: User,
        },
      ]
    }).then((artData) => res.status(200).json(artData));
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post("/upload", async (req, res) => {
   try {
    await Artwork.create({
      name: req.body.name,
      image: req.files.file.data.toString("base64"),
      user_id: 1,
    })
    res.status(200).json({"Message": "Succesfully added image to the database!"});
   } catch (err) {
      res.status(400).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
