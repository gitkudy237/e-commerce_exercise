require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const ProductModel = require("./models/productModel");
const productsRouter = require("./routes/products");

const app = express();

const Products = ProductModel(sequelize);

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync failed: ", err.message));

app.use(cors());
app.use(express.json());
app.use(express.static("./"));
app.use("/api/products", productsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
