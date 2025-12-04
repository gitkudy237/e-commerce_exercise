<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div class="form-group">
      <label for="name">Product Name *</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        required
        class="form-control"
        placeholder="Enter product name"
      />
    </div>

    <div class="form-group">
      <label for="price">Price *</label>
      <input
        v-model.number="form.price"
        type="number"
        id="price"
        required
        min="0"
        step="0.01"
        class="form-control"
        placeholder="Enter price"
      />
    </div>

    <div class="form-group">
      <label for="category">Category *</label>
      <input
        v-model="form.category"
        type="text"
        id="category"
        required
        class="form-control"
        placeholder="Enter product category"
      />
    </div>

    <div class="form-group">
      <label for="image">Product Image</label>
      <input
        @change="handleImageChange"
        type="file"
        id="image"
        accept="image/*"
        class="form-control"
      />
      <small v-if="imageFileName" class="text-muted"
        >Selected: {{ imageFileName }}</small
      >
    </div>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="success" class="success-message">{{ success }}</div>

    <div class="form-actions">
      <button type="submit" :disabled="loading" class="btn btn-primary">
        {{ loading ? "Saving..." : submitButtonText }}
      </button>
      <router-link to="/products" class="btn btn-secondary">Cancel</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import productService from "../services/productService";

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  submitButtonText: {
    type: String,
    default: "Add Product",
  },
});

const emit = defineEmits(["submit"]);

const form = ref({
  name: props.product?.name || "",
  price: props.product?.price || "",
  category: props.product?.category || "",
});

const imageFile = ref(null);
const imageFileName = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
  imageFileName.value = imageFile.value?.name || "";
};

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("price", form.value.price);
    formData.append("category", form.value.category);

    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    if (props.product?.id) {
      // Update existing product
      await productService.updateProduct(props.product.id, formData);
      success.value = "Product updated successfully!";
    } else {
      // Create new product
      await productService.createProduct(formData);
      success.value = "Product created successfully!";
    }

    setTimeout(() => {
      emit("submit");
    }, 1000);
  } catch (err) {
    error.value = `Error: ${err.message}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.product-form {
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.text-muted {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
