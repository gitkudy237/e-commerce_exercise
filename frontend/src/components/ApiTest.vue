<template>
  <div class="api-test">
    <h2>API Connection Test</h2>
    <button @click="testConnection">Test API Connection</button>
    <div v-if="loading" class="loading">Testing connection...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">
      ✓ Connection successful! Products found: {{ productCount }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import productService from "../services/productService";

export default {
  name: "ApiTest",
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const success = ref(false);
    const productCount = ref(0);

    const testConnection = async () => {
      loading.value = true;
      error.value = null;
      success.value = false;

      try {
        const products = await productService.getAllProducts();
        productCount.value = products.length;
        success.value = true;
      } catch (err) {
        error.value = `Connection failed: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      error,
      success,
      productCount,
      testConnection,
    };
  },
};
</script>

<style scoped>
.api-test {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.loading,
.error,
.success {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}

.loading {
  background-color: #e2e3e5;
  color: #383d41;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.success {
  background-color: #d4edda;
  color: #155724;
}
</style>
