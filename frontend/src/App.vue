<template>
  <div id="app">
    <nav class="container">
      <a href="#" @click.prevent="currentView = 'products'">Products</a>
      <a href="#" @click.prevent="currentView = 'cart'" v-if="user">Cart ({{ cartCount }})</a>
      <a href="#" @click.prevent="currentView = 'checkout'" v-if="user && cartCount">Checkout</a>
      <a href="#" @click.prevent="currentView = 'login'" v-if="!user">Login</a>
      <a href="#" @click.prevent="currentView = 'register'" v-if="!user">Register</a>
      <span v-if="user" style="margin-left: auto;">{{ user.email }}</span>
    </nav>
    
    <div class="container">
      <Products v-if="currentView === 'products'" @add-to-cart="addToCart" />
      <Login v-if="currentView === 'login'" @login="handleLogin" />
      <Register v-if="currentView === 'register'" @register="handleRegister" />
      <Cart v-if="currentView === 'cart'" :items="cartItems" @update-cart="updateCart" />
      <Checkout v-if="currentView === 'checkout'" @checkout="handleCheckout" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Products from './components/Products.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Cart from './components/Cart.vue'
import Checkout from './components/Checkout.vue'

export default {
  components: { Products, Login, Register, Cart, Checkout },
  data() {
    return {
      currentView: 'products',
      user: null,
      cartItems: [],
      cartCount: 0
    }
  },
  async mounted() {
    await this.loadCart()
  },
  methods: {
    async addToCart(product) {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        productId: product.id,
        quantity: 1
      })
      await this.loadCart()
    },
    async loadCart() {
      if (this.user) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`)
        this.cartItems = data
        this.cartCount = data.reduce((sum, item) => sum + item.quantity, 0)
      }
    },
    async handleLogin(userData) {
      this.user = userData
      localStorage.setItem('token', userData.token)
      await this.loadCart()
      this.currentView = 'products'
    },
    async handleRegister() {
      this.currentView = 'login'
    },
    async handleCheckout() {
      await axios.post(`${import.meta.env.VITE_API_URL}/checkout`)
      this.cartItems = []
      this.cartCount = 0
      alert('Order completed!')
      this.currentView = 'products'
    },
    async updateCart() {
      await this.loadCart()
    }
  }
}
</script>
