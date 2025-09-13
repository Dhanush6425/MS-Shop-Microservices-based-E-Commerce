import React, { useEffect, useState } from "react";
import "./product.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // ✅ Fetch products
  useEffect(() => {
    fetch("http://localhost:5002/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:5002/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]); // append new product
        setNewProduct({ name: "", price: "", description: "", image: "" });
        setShowForm(false);
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // or your auth storage
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="product-page">
      {/* 🔘 Logout button (top-right) */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <h1>Our Products</h1>

      {/* Toggle Add Form */}
      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        {showForm ? "✖ Cancel" : "➕ Add Product"}
      </button>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleAddProduct} className="add-product-form">
          <h2>Add a Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      )}

      {/* Product Grid */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id || product.productId}
              className="product-card"
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
