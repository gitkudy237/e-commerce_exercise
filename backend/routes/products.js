const express = require("express");
const sequelize = require("../config/database");
const ProductModel = require("../models/productModel");
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

router.get("/", (req, res) => {
  res.send(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => parseInt(id) == p.id);

  if (!product) return res.status(404).send("Product not found");
  res.send(product);
});

router.post("/", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(newProduct);

  res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => parseInt(id) == p.id);

  if (!product) return res.status(404).send("Product not found");

  Object.assign(product, req.body);
  res.send(product);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => parseInt(id) == p.id);

  if (!product) return res.status(404).send("Product not found");

  const index = products.findIndex((p) => parseInt(id) == p.id);
  products.splice(index, 1);

  res.status(200).send(product);
});

module.exports = router;
