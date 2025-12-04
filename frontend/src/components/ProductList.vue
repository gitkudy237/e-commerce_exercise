<template>
  <div class="product-list-container">
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="products.length === 0" class="empty">
      No products found.
    </div>
    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart(product)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";
import productService from "../services/productService";

const products = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    products.value = await productService.getAllProducts();
  } catch (err) {
    error.value = `Failed to load products: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const handleAddToCart = (product) => {
  console.log("Added to cart:", product);
  // This will be implemented in Stage 4 with cart management
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.loading,
.error,
.empty {
  padding: 2rem;
  text-align: center;
  font-size: 1.1rem;
}

.loading {
  color: #666;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
}

.empty {
  color: #999;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>
