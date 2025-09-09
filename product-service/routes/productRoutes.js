const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public route
router.get("/", getProducts);

// Protected route
router.post("/", authMiddleware, addProduct);

module.exports = router;
