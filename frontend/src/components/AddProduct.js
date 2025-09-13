import React, { useState } from "react";
import axios from "axios";

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onProductAdded(res.data); // update parent state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
