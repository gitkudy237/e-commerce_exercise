<template>
  <div class="app-container">
    <!-- NAVBAR -->
    <nav class="navbar">
      <h1 class="logo">
        <img src="./assets/logo.webp" alt="" />
        MiniShop NEWSHOP
      </h1>

      <div class="nav-links">
        <span>Home</span>
        <span>Products</span>
        <span>Cart ({{ cart.length }})</span>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="content">
      <ProductList :products="products" @add-to-cart="addToCart" />

      <Cart
        :cart="cart"
        @update-qty="updateQty"
        @checkout="checkout"
        @clear="clearCart"
      />
    </div>

    <!-- FOOTER -->
    <footer class="footer">© 2025 MiniShop — Built By TEMBE FONGHO WILLIAM</footer>
  </div>
</template>

<script>
import axios from "axios";
import ProductList from "./components/ProductList.vue";
import Cart from "./components/Cart.vue";

export default {
  components: { ProductList, Cart },

  data() {
    return {
      products: [],
      cart: [],
    };
  },

  async mounted() {
    const res = await axios.get("http://localhost:5000/api/products");
    this.products = res.data;
  },

  methods: {
    addToCart(product) {
      const existing = this.cart.find((i) => i.id === product.id);
      if (existing) {
        if (existing.qty + 1 <= product.stock) existing.qty++;
      } else {
        this.cart.push({ ...product, qty: 1 });
      }
    },

    updateQty(id, qty) {
      const item = this.cart.find((i) => i.id === id);
      if (item) item.qty = qty;
      if (item.qty <= 0) this.cart = this.cart.filter((i) => i.id !== id);
    },

    clearCart() {
      this.cart = [];
    },

    async checkout(customer) {
      try {
        const res = await axios.post("http://localhost:5000/api/checkout", {
          items: this.cart.map((i) => ({ id: i.id, qty: i.qty })),
          customer,
        });

        alert("Order placed! Order ID: " + res.data.order.id);

        const newProducts = await axios.get("http://localhost:5000/api/products");
        this.products = newProducts.data;

        this.clearCart();
      } catch (err) {
        alert("Checkout failed: " + err.response?.data?.error);
      }
    },
  },
};
</script>

<style>
.app-container {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

/* NAVBAR */
.navbar {
  background: #2a7be4;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
}

.logo img {
  width: 80px;
  height: 70px;
  border-radius: 10px;
}

.nav-links span {
  margin-left: 20px;
  cursor: pointer;
}

/* MAIN CONTENT */
.content {
  display: flex;
  gap: 25px;
  padding: 25px;
}

/* FOOTER */
.footer {
  background: #2a7be4;
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: 30px;
}
</style>
