<template>
  <div class="products-page">
    <div class="page-header">
      <h1>All Products</h1>
      <p>Browse our complete collection</p>
    </div>
    <ProductList />
  </div>
</template>

<script setup>
import ProductList from "../components/ProductList.vue";
</script>

<style scoped>
.products-page {
  min-height: calc(100vh - 200px);
}

.page-header {
  background-color: #f8f9fa;
  padding: 3rem 2rem;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #333;
}

.page-header p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}
</style>
