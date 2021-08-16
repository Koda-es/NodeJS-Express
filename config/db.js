'use strict';

const config = require('./dotenv');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false
});

module.exports = { sequelize };