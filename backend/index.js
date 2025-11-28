require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const productsRouter = require("./routes/products");

const app = express();

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync failed: ", err.message));

app.use(express.json());
app.use("/api/products", productsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
