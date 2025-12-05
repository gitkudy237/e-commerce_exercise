const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

// default route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// start server new server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));