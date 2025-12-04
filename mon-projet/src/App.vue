<template>
  <div class="container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <h1>Notre Boutique</h1>
      </div>
      <ul class="nav-links">
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Produits</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div class="search-cart">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un produit..."
        />
        <span class="cart-count">Panier : {{ cart.length }} article(s)</span>
      </div>
    </nav>

    <!-- Products -->
    <div class="products-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }} €</p>
        <button @click="addToCart(product)">Ajouter au panier</button>
      </div>
    </div>

    <!-- Panier détaillé -->
    <div v-if="cart.length > 0" class="cart-details">
      <h2>Contenu du panier</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - {{ item.price }} €
        </li>
      </ul>
      <p><strong>Total :</strong> {{ totalPrice }} €</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Chaussures', price: 60, image: 'https://images.unsplash.com/photo-1589389943478-f89b2f7d1d85?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Sac à main', price: 120, image: 'https://images.unsplash.com/photo-1593032465175-7e37fbbdf53e?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Montre', price: 90, image: 'https://images.unsplash.com/photo-1600181955256-38c22c8d2676?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Lunettes', price: 45, image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&q=80' },
])

const searchQuery = ref('')
const cart = ref([])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function addToCart(product) {
  cart.value.push(product)
}

const totalPrice = computed(() => {
  return cart.value.reduce((sum, product) => sum + product.price, 0)
})
</script>

<style scoped>
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #42b983;
  padding: 10px 20px;
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
}

.logo h1 {
  margin: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links li a:hover {
  text-decoration: underline;
}

.search-cart {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-cart input {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
}

.cart-count {
  font-weight: bold;
}

/* Products Grid */
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 200px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.product-card img {
  max-width: 100%;
  border-radius: 10px;
}

button {
  margin-top: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}

/* Panier détaillé */
.cart-details {
  margin-top: 40px;
  text-align: left;
}

.cart-details h2 {
  color: #42b983;
}

.cart-details ul {
  list-style: none;
  padding: 0;
}

.cart-details li {
  padding: 5px 0;
}
</style>
