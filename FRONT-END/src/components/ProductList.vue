<template>
  <div class="products">
    <h2>Our Products</h2>

    <div class="grid">
      <div class="product-card" v-for="p in products" :key="p.id">
        <img :src="p.image" alt="product image" class="product-img" />

        <h3>{{ p.name }}</h3>
        <p class="desc">{{ p.description }}</p>
        <p class="price">{{ p.price }}FCFA</p>

        <button class="btn" @click="$emit('add-to-cart', p)" :disabled="p.stock === 0">
          {{ p.stock === 0 ? "Out of Stock" : "Add to Cart" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
};
</script>

<style>
.products {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.btn {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: #2a7be4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
