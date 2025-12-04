<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>USEFUL LINKS</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Product</router-link></li>
          <li><router-link to="/faqs">FAQs</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>SOCIAL MEDIA</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Whatsapp</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>OTHERS</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/products">Product</router-link></li>
          <li><router-link to="/faqs">FAQs</router-link></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>DESIGNED BY BH</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped src="../styles/footer.css"></style>