<template>
  <header>
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Buy and Take</h2>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/faqs">FAQs</router-link>
        <div v-if="!isAuthenticated" class="auth-links">
          <router-link to="/login" class="login-btn">Login</router-link>
          <router-link to="/register" class="register-btn">Register</router-link>
        </div>
        <div v-else class="user-menu">
          <span>Welcome, {{ user.name }}</span>
          <button @click="logout" class="logout-btn">Logout</button>
          <router-link to="/cart" class="cart-btn">Cart ({{ cartItemCount }})</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'cartItemCount'])
  },
  methods: {
    ...mapActions(['logoutUser']),
    async logout() {
      await this.logoutUser()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped src="../styles/header.css"></style>