<template>
  <div class="card">
    <h2>Checkout</h2>
    <p>Order total: ${{ total }}</p>
    <button class="btn" @click="$emit('checkout')">Complete Order</button>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$parent.cartItems.reduce((sum, item) => {
        return sum + (item.Product.price * item.quantity)
      }, 0).toFixed(2)
    }
  }
}
</script>
