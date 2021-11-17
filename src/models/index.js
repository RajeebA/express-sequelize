/* eslint-disable global-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
const Sequelize = require('sequelize');
const { db } = require('../config/config');

const sequelize = new Sequelize(db.database, db.username, db.password, db);

const models = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize.DataTypes),
  token: require('./token')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
