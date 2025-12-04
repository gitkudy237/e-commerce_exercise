<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="credentials.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      try {
        await this.loginUser(this.credentials)
        this.$router.push('/')
      } catch (error) {
        alert('Login failed: ' + error.message)
      }
    }
  }
}
</script>

<style scoped src="../styles/auth.css"></style>