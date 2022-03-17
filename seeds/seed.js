const sequelize = require("../config/connection");
const { User, Artwork } = require("../models");

const userData = require("./userData.json");
const artData = require("./artData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  for (const user of userData) {
    await User.create(user);
  }

  for (const art of artData) {
    await Artwork.create(art);
  }

  process.exit(0);
};

seedDatabase();
