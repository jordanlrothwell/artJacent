const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  for (const user of userData) {
    await User.create(user);
  }
  process.exit(0);
};

seedDatabase();
