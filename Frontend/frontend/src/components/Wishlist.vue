<template>
  <div class="wishlist-page">
    <!-- Search Section -->
    <div class="search-section">
      <h2>Track Product Prices</h2>
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Enter product URL (Amazon, eBay, etc.)"
          v-model="productUrl"
          class="search-input"
          @keyup.enter="addProduct"
        >
        <button @click="addProduct" class="search-button">Track Product</button>
      </div>
      <div class="total-value">
        <strong>Total Wishlist Value:</strong> €{{ totalValue.toFixed(2) }}
      </div>
    </div>

    <!-- Product List -->
    <div class="product-list">
      <div v-if="items.length === 0" class="empty-state">
        No products in your wishlist yet
      </div>
      <div v-else>
        <!-- Product items would be rendered here -->
      </div>
    </div>

    <!-- Error Modal -->
    <div v-if="showError" class="error-modal">
      <div class="modal-content">
        <span class="close" @click="showError = false">&times;</span>
        <p>Please enter a valid product URL</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishList',
  data() {
    return {
      productUrl: '',
      items: [],
      showError: false
    }
  },
  computed: {
    totalValue() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    }
  },
  methods: {
    addProduct() {
      if (!this.productUrl.trim()) {
        this.showError = true
        return
      }

      this.items.push({
        id: Date.now(),
        url: this.productUrl,
        price: 0.00, // This would be populated with actual price from your backend
        lastChecked: new Date().toLocaleDateString()
      })

      this.productUrl = ''
    }
  }
}
</script>

<style scoped>
.wishlist-page {
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
}

.search-section {
  margin-bottom: 2rem;
  text-align: center;
}

.search-section h2 {
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

.search-button {
  padding: 0 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: var(--primary-dark);
}

.total-value {
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: var(--secondary);
  border-radius: var(--border-radius);
  display: inline-block;
}

.product-list {
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  min-height: 200px;
}

.empty-state {
  text-align: center;
  color: var(--text-light);
  padding: 2rem;
}

.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  .search-button {
    padding: 0.75rem;
  }
}
</style>