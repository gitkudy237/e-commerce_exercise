<template>
  <div class="product-card">
    <div class="product-image">
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="image"
      />
      <div v-else class="no-image">No Image</div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-category">{{ product.category }}</p>
      <p class="product-price">${{ product.price }}</p>
      <div class="product-actions">
        <router-link :to="`/products/${product.id}`" class="btn btn-view">
          View Details
        </router-link>
        <button @click="$emit('add-to-cart')" class="btn btn-cart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["add-to-cart"]);
</script>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  color: #999;
  font-weight: bold;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

.product-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #666;
}

.product-price {
  margin: 0.5rem 0;
  font-size: 1.5rem;
  color: #ff6b6b;
  font-weight: bold;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-view {
  background-color: #007bff;
  color: white;
}

.btn-view:hover {
  background-color: #0056b3;
}

.btn-cart {
  background-color: #28a745;
  color: white;
}

.btn-cart:hover {
  background-color: #218838;
}
</style>
