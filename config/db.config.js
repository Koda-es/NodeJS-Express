'use strict';

const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodejs_mysql'
});

dbConnection.connect((err) => {
  if (err) throw err;

  console.log("Database Connected!");
});

module.exports = dbConnection;