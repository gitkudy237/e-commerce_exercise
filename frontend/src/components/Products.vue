<template>
  <div>
    <h1>Products</h1>
    <div class="product-grid">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">{{ product.name.charAt(0) }}</div>
        <h3>{{ product.name }}</h3>
        <p>${{ product.price }}</p>
        <p>{{ product.description }}</p>
        <button class="btn" @click="$emit('add-to-cart', product)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
    this.products = data
  }
}
</script>
