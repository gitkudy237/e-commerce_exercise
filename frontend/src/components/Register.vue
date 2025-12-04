<template>
  <div class="card">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="btn">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          email: this.email,
          password: this.password
        })
        this.$emit('register')
      } catch (error) {
        alert('Registration failed')
      }
    }
  }
}
</script>
