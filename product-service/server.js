import express from "express";
import multer from "multer";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MySQL connection
const db = mysql.createConnection({
  host: "crossover.proxy.rlwy.net",
  user: "root",
  password: "cdOzBzXPgOYIIcCBvBzfWStquKDTKvrI",
  database: "railway",
  port: 37319,
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST add product
app.post("/products", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  db.query(
    "INSERT INTO products (name, price, image_url) VALUES (?, ?, ?)",
    [name, price, imageUrl],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, price, image_url: imageUrl });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
