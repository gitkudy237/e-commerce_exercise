<template>
  <div class="card">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="btn">Login</button>
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
    async login() {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email: this.email,
          password: this.password
        })
        this.$emit('login', data)
      } catch (error) {
        alert('Login failed')
      }
    }
  }
}
</script>
