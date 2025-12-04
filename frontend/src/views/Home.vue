<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>WELCOME</h1>
        <h2>To buy and take</h2>
        <p>Get the best products online with us for affordable prices. Get the best products online with us for affordable prices</p>
      </div>
    </section>
    
    <section class="featured-products">
      <h2>Products</h2>
      <div class="products-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-price">${{ product.price }}</p>
            <button class="order-btn" @click="addToCart(product)">Order</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      featuredProducts: [
        { id: 1, name: 'Premium Headphones', price: 99.99, image: '/images/headphones.jpg' },
        { id: 2, name: 'Smart Watch', price: 149.99, image: '/images/smartwatch.jpg' },
        { id: 3, name: 'Wireless Speaker', price: 79.99, image: '/images/speaker.jpg' }
      ]
    }
  },
  methods: {
    ...mapActions(['addToCart'])
  }
}
</script>

<style scoped src="../styles/home.css"></style>