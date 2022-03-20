const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { geoparse } = require("../utils");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class User extends Model {
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        await timeout(1000);
        user.password = await bcrypt.hash(user.password, 12);
        const geoparseObj = await geoparse(user.address);
        user.address = geoparseObj.address;
        user.latitude = geoparseObj.coordinates.lat;
        user.longitude = geoparseObj.coordinates.lon;
      },
      beforeUpdate: async (user) => {
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
