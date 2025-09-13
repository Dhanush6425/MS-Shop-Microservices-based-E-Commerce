import React, { useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";

function ProductPage() {
  const [products, setProducts] = useState([]);

  const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]); // add new product to existing list
  };

  return (
    <>
      <AddProduct onProductAdded={handleProductAdded} />
      <Product products={products} />
    </>
  );
}

export default ProductPage;
