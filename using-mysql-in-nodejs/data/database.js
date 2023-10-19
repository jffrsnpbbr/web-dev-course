const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MLNn6p2wfy$ViV',
  database: 'blog'
});

module.exports = pool;