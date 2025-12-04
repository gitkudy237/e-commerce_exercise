<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>About</h3>
        <p>Your go-to online shopping destination for quality products.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Products</router-link></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 E-Shop. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: #333;
  color: white;
  padding: 2rem 0 0;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  margin-top: 0;
  color: #ffd700;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #ffd700;
}

.footer-bottom {
  border-top: 1px solid #555;
  text-align: center;
  padding: 1rem;
  color: #999;
}
</style>
