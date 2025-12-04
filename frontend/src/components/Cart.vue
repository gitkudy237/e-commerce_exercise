<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-if="items.length === 0" class="card">
      Cart is empty
    </div>
    <div v-else>
      <div v-for="item in items" :key="item.id" class="cart-item card">
        <span>{{ item.Product.name }} x{{ item.quantity }}</span>
        <span>${{ (item.Product.price * item.quantity).toFixed(2) }}</span>
      </div>
      <div style="text-align: right; margin-top: 20px;">
        <h3>Total: ${{ total }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  computed: {
    total() {
      return this.items.reduce((sum, item) => {
        return sum + (item.Product.price * item.quantity)
      }, 0).toFixed(2)
    }
  }
}
</script>
