<template>
  <div class="cart">
    <h2>Cart</h2>

    <div v-if="cart.length === 0">No items in cart</div>

    <div v-else>
      <div v-for="item in cart" :key="item.id" class="item">
        <div>{{ item.name }} — ${{ item.price }}</div>
        <div>
          <input type="number" v-model.number="item.qty" @input="emitQty(item)" min="1" />
        </div>
      </div>

      <h3>Total: {{ total }}FCFA</h3>

      <div>
        <input v-model="customer.name" placeholder="Name" />
        <input v-model="customer.email" placeholder="Email" />
        <textarea v-model="customer.address" placeholder="Address"></textarea>

        <button @click="checkout">Checkout</button>
        <button @click="$emit('clear')">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],

  data() {
    return {
      customer: {
        name: "",
        email: "",
        address: "",
      },
    };
  },

  computed: {
    total() {
      return this.cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
    },
  },

  methods: {
    emitQty(item) {
      this.$emit("update-qty", item.id, item.qty);
    },
    checkout() {
      this.$emit("checkout", this.customer);
    },
  },
};
</script>

<style>
.cart {
  padding: 20px;
  border-radius: 12px;
  background: white;
  width: 320px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

button {
  width: 100%;
  padding: 10px;
  background: #2a7be4;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
}

button:nth-child(2) {
  background: #e42a2a;
}
</style>
