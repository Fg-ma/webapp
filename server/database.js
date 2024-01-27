const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql-db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
});

module.exports = { db };
