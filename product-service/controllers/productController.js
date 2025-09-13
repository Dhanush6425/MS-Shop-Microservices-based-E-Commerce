// controllers/productController.js
const db = require("../config/db");

// ✅ Get all products
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM Products", (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
};

// ✅ Add a new product
exports.addProduct = (req, res) => {
  const { name, price, image, image_url } = req.body;

  // Accept either "image" or "image_url"
  const finalImage = image || image_url;

  if (!name || !price || !finalImage) {
    return res
      .status(400)
      .json({ error: "Name, price and image are required" });
  }

  db.query(
    "INSERT INTO Products (name, price, image_url) VALUES (?, ?, ?)",
    [name, price, finalImage],
    (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ error: err.sqlMessage });
      }

      res.json({
        id: result.insertId,
        name,
        price,
        image: finalImage, // ✅ return image to frontend
      });
    }
  );
};
