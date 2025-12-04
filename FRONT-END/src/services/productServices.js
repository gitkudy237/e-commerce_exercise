// CONNECTING THE BACK-END(products.js to display the products) TO THE FRONT-END
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;  // this is the array of products
};