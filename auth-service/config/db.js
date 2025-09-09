// auth-service/db.js
const mysql = require("mysql2");
require("dotenv").config();
// Connection pool
const db = mysql.createPool({
  host: "maglev.proxy.rlwy.net",      // e.g. crossover.proxy.rlwy.net
  port: 47944,      // e.g. 37319
  user: "root",      // e.g. root
  password: "WDCJrlSdUIRbNnBiULzTKnAKQgmZBYDc",  // your password
  database: "railway"   // e.g. auth_db
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Auth DB Connection Error:", err);
  } else {
    console.log("✅ Connected to Auth DB");
    connection.release();
  }
});

module.exports = db;
