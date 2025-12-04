const { DataTypes } = require('sequelize');
const sequelize = require('../config/config').development;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return User;
};
