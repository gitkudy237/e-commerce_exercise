<template>
  <div class="home-page">
    <div class="hero">
      <div class="hero-content">
        <h1>Welcome to E-Shop</h1>
        <p>Discover amazing products at great prices</p>
        <router-link to="/products" class="cta-button">Shop Now</router-link>
      </div>
    </div>
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">🚚</div>
        <h3>Fast Shipping</h3>
        <p>Quick delivery to your doorstep</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💰</div>
        <h3>Best Prices</h3>
        <p>Competitive pricing on all products</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✨</div>
        <h3>Quality Guaranteed</h3>
        <p>Premium quality products</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.home-page {
  min-height: calc(100vh - 200px);
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
}

.hero-content p {
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
}

.cta-button {
  display: inline-block;
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #ff5252;
}

.features {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin: 1rem 0 0.5rem 0;
  color: #333;
}

.feature-card p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1.1rem;
  }
}
</style>
