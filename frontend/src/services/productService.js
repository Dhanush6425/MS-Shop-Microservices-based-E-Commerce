import axios from "axios";

const API_URL = "http://localhost:5002/api/products";

// get all products (public)
export const getProducts = () => {
  return axios.get(API_URL);
};

// add product (requires login)
export const addProduct = (productData) => {
  const token = localStorage.getItem("token");
  return axios.post(API_URL, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
