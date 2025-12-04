const express = require("express");
const multer = require("multer");
const path = require("path");
const sequelize = require("../config/database");
const ProductModel = require("../models/productModel");
const router = express.Router();

const Product = ProductModel(sequelize);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const productData = req.body;
    
    if (req.file) {
      productData.imageUrl = `/images/${req.file.filename}`;
    }
    
    const newProduct = await Product.create(productData);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).send("Product not found");

    const updateData = req.body;
    
    if (req.file) {
      updateData.imageUrl = `/images/${req.file.filename}`;
    }
    
    await product.update(updateData);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).send("Product not found");

    await product.destroy();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
