const router = require("express").Router();
const session = require("express-session");
const { User, Artwork } = require("../../models");
const path = require("path");

// signup - creates a new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.user_id = dbUserData.id;
    req.session.logged_in = true;

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login - checks for an existing user and logs in
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

    req.session.user_id = dbUserData.id;
    req.session.logged_in = true;

    res
      .status(200)
      .json({ user: dbUserData, message: "You are now logged in!" });
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
      ],
    }).then((artData) => res.status(200).json(artData));
  } catch (err) {
    res.status(400).json(err);
  }
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    Artwork.create({
      name: req.file.originalname,
      image: path.join("/images", req.file.originalname),
      user_id: req.session.user_id,
    });
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
