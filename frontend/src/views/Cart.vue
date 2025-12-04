<template>
  <div class="cart-page">
    <div class="container">
      <h1>Shopping Cart</h1>
      
      <div v-if="cart.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-price">${{ item.price }}</p>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.id)">+</button>
            </div>
            <div class="item-total">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
            <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ cartTotal }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ (cartTotal + 5).toFixed(2) }}</span>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cart', 'cartTotal'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateQuantity']),
    increaseQuantity(productId) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        this.updateQuantity({ productId, quantity: item.quantity + 1 })
      }
    },
    decreaseQuantity(productId) {
      const item = this.cart.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        this.updateQuantity({ productId, quantity: item.quantity - 1 })
      }
    }
  }
}
</script>

<style scoped src="../styles/cart.css"></style>