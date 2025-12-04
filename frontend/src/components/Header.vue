<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <h1>🛍️ E-Shop</h1>
        </router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/products" class="nav-link">Products</router-link>
        <router-link to="/products/add" class="nav-link create-btn"
          >+ Create Product</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: #333;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  text-decoration: none;
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  color: #ffd700;
}

.nav-link.router-link-active {
  color: #ffd700;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 0.5rem;
}

.create-btn {
  background-color: #ff6b6b;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: white !important;
}

.create-btn:hover {
  background-color: #ff5252;
  color: white !important;
}
</style>
