const express = require("express");
const router = express.Router();

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    category: "Electronics",
    created_at: "2025-01-15 10:23:00",
  },
  {
    id: 2,
    name: "Men's Running Sneakers",
    price: 79.5,
    category: "Footwear",
    created_at: "2025-02-02 14:10:00",
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 15.0,
    category: "Accessories",
    created_at: "2025-02-20 09:45:00",
  },
];
