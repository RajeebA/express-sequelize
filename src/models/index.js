const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { db } = require('../config/config');

const basename = path.basename(__filename);

const sequelize = new Sequelize(db.database, db.username, db.password, db);
const models = {};

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (db[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
