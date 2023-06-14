require("dotenv").config();
const mysql = require("mysql2");
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const connection = mysql.createConnection({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "airline",
});

module.exports = connection;
