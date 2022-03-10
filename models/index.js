const User = require("./User");
const Artwork = require("./Artwork");

User.hasMany(Artwork, {
  foreignKey: "user_id",
});

Artwork.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Artwork };
