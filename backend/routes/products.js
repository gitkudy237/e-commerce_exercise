const express = require("express");
const sequelize = require("../config/database");
const ProductModel = require("../models/productModel");
const router = express.Router();

const Product = ProductModel(sequelize);

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const product = products.find((p) => parseInt(id) == p.id);

//   if (!product) return res.status(404).send("Product not found");
//   res.send(product);
// });

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const product = products.find((p) => parseInt(id) == p.id);

//   if (!product) return res.status(404).send("Product not found");

//   Object.assign(product, req.body);
//   res.send(product);
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const product = products.find((p) => parseInt(id) == p.id);

//   if (!product) return res.status(404).send("Product not found");

//   const index = products.findIndex((p) => parseInt(id) == p.id);
//   products.splice(index, 1);

//   res.status(200).send(product);
// });

module.exports = router;
