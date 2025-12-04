const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

const Product = sequelize.define('Product', {
  name: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
  description: Sequelize.TEXT,
  image: Sequelize.STRING,
  stock: Sequelize.INTEGER
});

const Cart = sequelize.define('Cart', {
  userId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER
});

const app = express();
app.use(cors());
app.use(express.json());

let currentUser = null;

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  res.json({ message: 'User created', userId: user.id });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    currentUser = user;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, userId: user.id });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  await Cart.create({ userId: currentUser.id, productId, quantity });
  res.json({ message: 'Added to cart' });
});

app.get('/cart', async (req, res) => {
  const cart = await Cart.findAll({
    where: { userId: currentUser.id },
    include: [Product]
  });
  res.json(cart);
});

app.post('/checkout', async (req, res) => {
  await Cart.destroy({ where: { userId: currentUser.id } });
  res.json({ message: 'Order completed' });
});

sequelize.sync({ force: true }).then(async () => {
  await Product.bulkCreate([
    { name: 'Tan Shirt', price: 29.99, description: 'Comfortable cotton shirt', image: 'shirt.jpg', stock: 20 },
    { name: 'Brown Jacket', price: 89.99, description: 'Warm winter jacket', image: 'jacket.jpg', stock: 15 },
    { name: 'Tan Pants', price: 49.99, description: 'Slim fit chinos', image: 'pants.jpg', stock: 25 }
  ]);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
