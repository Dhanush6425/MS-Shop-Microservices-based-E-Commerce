const express = require("express");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Product Service running on port ${PORT}`);
});
