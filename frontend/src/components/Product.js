import db from "../../config/db"; // adjust path to your DB config

export default function handler(req, res) {
  if (req.method === "GET") {
    db.query("SELECT * FROM Products", (err, results) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json(results);
    });
  }

  if (req.method === "POST") {
    const { name, price, image_url } = req.body;
    if (!name || !price || !image_url) {
      return res.status(400).json({ error: "Name, price, and image required" });
    }

    db.query(
      "INSERT INTO Products (name, price, image_url) VALUES (?, ?, ?)",
      [name, price, image_url],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ id: result.insertId, name, price, image_url });
      }
    );
  }
}
