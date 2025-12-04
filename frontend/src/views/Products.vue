<template>
  <div class="products-page">
    <div class="page-header">
      <h1>Products</h1>
    </div>
    
    <div class="products-container">
      <div class="product-filters">
        <input type="text" v-model="searchQuery" placeholder="Search products..." class="search-input">
        <select v-model="categoryFilter" class="category-select">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>
      
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">${{ product.price }}</p>
            <button class="order-btn" @click="addToCart(product)">Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Products',
  data() {
    return {
      searchQuery: '',
      categoryFilter: '',
      products: [
        { id: 1, name: 'Premium Headphones', price: 99.99, category: 'electronics', description: 'High-quality wireless headphones', image: '/images/headphones.jpg' },
        { id: 2, name: 'Smart Watch', price: 149.99, category: 'electronics', description: 'Feature-rich smartwatch', image: '/images/smartwatch.jpg' },
        { id: 3, name: 'Wireless Speaker', price: 79.99, category: 'electronics', description: 'Portable Bluetooth speaker', image: '/images/speaker.jpg' },
        { id: 4, name: 'T-Shirt', price: 24.99, category: 'clothing', description: 'Comfortable cotton t-shirt', image: '/images/tshirt.jpg' },
        { id: 5, name: 'Desk Lamp', price: 39.99, category: 'home', description: 'Modern LED desk lamp', image: '/images/lamp.jpg' },
        { id: 6, name: 'Backpack', price: 49.99, category: 'clothing', description: 'Durable travel backpack', image: '/images/backpack.jpg' }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.categoryFilter || product.category === this.categoryFilter
        return matchesSearch && matchesCategory
      })
    }
  },
  methods: {
    ...mapActions(['addToCart'])
  }
}
</script>

<style scoped src="../styles/products.css"></style>