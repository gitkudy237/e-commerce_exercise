import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: []
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    cartItemCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    products: state => state.products
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_AUTH(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    }
  },
  actions: {
    async loginUser({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials)
        const { token, user } = response.data
        
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },
    async registerUser({ commit }, userData) {
      try {
        const response = await axios.post('/api/auth/register', userData)
        const { token, user } = response.data
        
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },
    async logoutUser({ commit }) {
      commit('CLEAR_AUTH')
      commit('CLEAR_CART')
      delete axios.defaults.headers.common['Authorization']
    },
    async checkAuth({ commit, state }) {
      if (state.token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
          const response = await axios.get('/api/auth/me')
          commit('SET_USER', response.data.user)
        } catch (error) {
          commit('CLEAR_AUTH')
        }
      }
    },
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/api/products')
        commit('SET_PRODUCTS', response.data)
        return response.data
      } catch (error) {
        throw error.response?.data || error
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  }
})