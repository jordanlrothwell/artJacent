const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// TODO: middleware to salt & hash password
// TODO: middleware to check password for existing user

// TODO: create sequelize instance & import it here 

class User extends Model {}

// TODO: middleware to validate email

User.init(
{
  id: {
    type: DataTypes.INTEGER,
    allownull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allownull: false,
  },
  location: {
    type: DataTypes.STRING,
    allownull: false,
  },
  password: {
    type: DataTypes.STRING,
    allownull: false,
  },
);
