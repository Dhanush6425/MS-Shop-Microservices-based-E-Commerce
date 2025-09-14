import mysql from "mysql2/promise";

let pool;

// ✅ Create connection pool (serverless safe)
async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

// ✅ API handler
export default async function handler(req, res) {
  try {
    const pool = await getPool();

    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM products");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { name, price, description, image } = req.body;

      if (!name || !price || !image) {
        return res.status(400).json({ error: "Name, price, and image are required" });
      }

      const [result] = await pool.query(
        "INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)",
        [name, price, description || "", image]
      );

      return res.status(201).json({
        id: result.insertId,
        name,
        price,
        description: description || "",
        image_url: image,
      });
    }

    // If other HTTP methods
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
