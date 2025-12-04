<template>
  <div class="edit-product-page">
    <router-link to="/products" class="back-link"
      >&larr; Back to Products</router-link
    >

    <div v-if="loading" class="loading">Loading product...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product">
      <div class="page-header">
        <h1>Edit Product</h1>
        <p>Update the product details below</p>
      </div>

      <ProductForm
        :product="product"
        submit-button-text="Update Product"
        @submit="handleProductUpdated"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductForm from "../components/ProductForm.vue";
import productService from "../services/productService";

const router = useRouter();
const route = useRoute();

const product = ref(null);
const loading = ref(false);
const error = ref("");

const fetchProduct = async () => {
  loading.value = true;
  error.value = "";
  try {
    product.value = await productService.getProductById(route.params.id);
  } catch (err) {
    error.value = `Failed to load product: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const handleProductUpdated = () => {
  router.push(`/products/${route.params.id}`);
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.edit-product-page {
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

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #333;
}

.page-header p {
  margin: 0;
  color: #666;
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
</style>
