const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: "crossover.proxy.rlwy.net",
  port: 37319,
  user: "root",
  password: "cdOzBzXPgOYIIcCBvBzfWStquKDTKvrI",
  database: "railway"
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Product DB Connection Error:", err);
  } else {
    console.log("✅ Connected to Product DB");
    connection.release();
  }
});

module.exports = db;
