<template>
  <div class="home-page">
    <!-- Search Bar Section -->
    <section class="search-section">
      <div class="search-container">
        <h2>Track Product Prices</h2>
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Enter product URL (Amazon, eBay, etc.)"
            v-model="productUrl"
          >
          <button @click="addProduct">Add to Tracker</button>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="instructions-section">
      <div class="instructions-container">
        <h3>How Wishlist Tracker Works</h3>
        <ol class="steps">
          <li>Add product links from supported stores</li>
          <li>We monitor prices daily and track historical data</li>
          <li>Set target prices for notifications</li>
          <li>Get alerts when prices drop below your targets</li>
        </ol>
        <div class="mission">
          <strong>Our Mission:</strong> Help shoppers save money through automated price tracking.
        </div>
      </div>
    </section>

    <!-- Tracked Products Section -->
    <section class="tracked-products">
      <h3>Your Tracked Products</h3>
      <div class="product-list">
        <!-- Product items will be rendered here -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      productUrl: ''
    }
  },
  methods: {
    addProduct() {
      // Add your product tracking logic here
      console.log('Tracking product:', this.productUrl);
      this.productUrl = '';
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 2rem;
  width: 100%;
}

.search-section {
  margin-bottom: 2rem;
}

.search-container {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.search-container h2 {
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

.search-bar button {
  padding: 0 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.search-bar button:hover {
  background-color: var(--primary-dark);
}

.instructions-section {
  margin-bottom: 2rem;
}

.instructions-container {
  background-color: var(--secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.steps {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.steps li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
}

.steps li::before {
  content: "•";
  color: var(--primary);
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

.mission {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  font-style: italic;
}

.tracked-products {
  margin-top: 2rem;
}

.tracked-products h3 {
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }
  
  .search-bar button {
    padding: 0.75rem;
  }
}
</style>