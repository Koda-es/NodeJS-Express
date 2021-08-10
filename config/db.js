'use strict';

const mysql = require('mysql');

const config = require('./dotenv');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = config;

const dbConnection = mysql.createConnection({
  host     : DB_HOST,
  user     : DB_USER,
  password : DB_PASSWORD,
  database : DB_DATABASE
});

dbConnection.connect((err) => {
  if (err) throw err;

  console.log('Database Connected!');
});

module.exports = dbConnection;