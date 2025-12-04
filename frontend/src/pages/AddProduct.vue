<template>
  <div class="add-product-page">
    <router-link to="/products" class="back-link"
      >&larr; Back to Products</router-link
    >

    <div class="page-header">
      <h1>Add New Product</h1>
      <p>Fill in the details below to add a new product to the store</p>
    </div>

    <ProductForm
      submit-button-text="Add Product"
      @submit="handleProductAdded"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ProductForm from "../components/ProductForm.vue";

const router = useRouter();

const handleProductAdded = () => {
  router.push("/products");
};
</script>

<style scoped>
.add-product-page {
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
</style>
