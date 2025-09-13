// index.js
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000",
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/Products", productRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Product Service running on port ${PORT}`);
});
