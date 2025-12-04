<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="userData.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="userData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="userData.password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="userData.confirmPassword" required>
        </div>
        <button type="submit" class="register-btn">Register</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    async register() {
      if (this.userData.password !== this.userData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      
      try {
        await this.registerUser(this.userData)
        this.$router.push('/')
      } catch (error) {
        alert('Registration failed: ' + error.message)
      }
    }
  }
}
</script>

<style scoped src="../styles/auth.css"></style>