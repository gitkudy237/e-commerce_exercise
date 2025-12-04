<template>
  <div class="product-detail-page">
    <router-link to="/products" class="back-link"
      >&larr; Back to Products</router-link
    >

    <div v-if="loading" class="loading">Loading product...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <div class="product-image">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.name"
          class="image"
        />
        <div v-else class="no-image">No Image Available</div>
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-category">Category: {{ product.category }}</p>
        <p class="product-price">${{ product.price }}</p>
        <p class="product-description">
          Premium quality product with excellent features.
        </p>

        <div class="product-actions">
          <button @click="handleAddToCart" class="btn btn-add-to-cart">
            Add to Cart
          </button>
          <router-link
            :to="`/products/${product.id}/edit`"
            class="btn btn-edit"
          >
            Edit Product
          </router-link>
          <button @click="handleDelete" class="btn btn-delete">
            Delete Product
          </button>
        </div>

        <div class="product-meta">
          <p><strong>Product ID:</strong> #{{ product.id }}</p>
          <p><strong>Created:</strong> {{ formatDate(product.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import productService from "../services/productService";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  try {
    product.value = await productService.getProductById(route.params.id);
  } catch (err) {
    error.value = `Failed to load product: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const handleAddToCart = () => {
  console.log("Added to cart:", product.value);
  // This will be implemented in Stage 4 with cart management
};

const handleDelete = async () => {
  if (
    confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    )
  ) {
    try {
      await productService.deleteProduct(product.value.id);
      alert("Product deleted successfully!");
      router.push("/products");
    } catch (err) {
      error.value = `Failed to delete product: ${err.message}`;
    }
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
}

.back-link {
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.3s;
}

.back-link:hover {
  color: #0056b3;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-image {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
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
  display: flex;
  flex-direction: column;
}

.product-name {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #333;
}

.product-category {
  margin: 0 0 0.5rem 0;
  color: #666;
}

.product-price {
  margin: 0.5rem 0 1rem 0;
  font-size: 2rem;
  color: #ff6b6b;
  font-weight: bold;
}

.product-description {
  margin: 1rem 0 2rem 0;
  color: #666;
  line-height: 1.6;
}

.product-actions {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-add-to-cart {
  background-color: #28a745;
}

.btn-add-to-cart:hover {
  background-color: #218838;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.product-meta {
  border-top: 1px solid #ddd;
  padding-top: 2rem;
  color: #666;
}

.product-meta p {
  margin: 0.5rem 0;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  font-size: 1.1rem;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 1.5rem;
  }
}
</style>
