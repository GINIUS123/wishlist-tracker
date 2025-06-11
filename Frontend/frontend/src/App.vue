<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link">🏠 Home</router-link>
      <router-link to="/about" class="nav-link">ℹ️ About</router-link>
      <router-link to="/deep-tech" class="nav-link">⚙️ Tech Specs</router-link>
    </nav>
    <main class="main-content">
      <!-- Search Section -->
      <div v-if="$route.path === '/'" class="search-section">
        <h2 class="section-title">Product Price Tracker</h2>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Paste product URL (Amazon, eBay, etc.)"
            v-model="productUrl"
            class="search-input"
            @keyup.enter="handleProductAdd"
          >
          <button @click="handleProductAdd" class="search-button">
            <span class="button-icon">+</span> Track Product
          </button>
        </div>
        <div v-if="items.length > 0" class="wishlist-total">
          <span class="total-label">Wishlist Total:</span>
          <span class="total-value">€{{ totalValue.toFixed(2) }}</span>
        </div>
      </div>

      <!-- How it works -->
      <div v-if="$route.path === '/'" class="instructions-section">
        <h3 class="instructions-title">How It Works</h3>
        <ol class="steps">
          <li class="step-item">Add product links from major retailers</li>
          <li class="step-item">Daily price monitoring & historical tracking</li>
          <li class="step-item">Instant notifications for price drops</li>
          <li class="step-item">Smart recommendations for optimal buying</li>
        </ol>
        <div class="mission-statement">
          <div class="mission-icon">✦</div>
          <p>Our mission is to provide intelligent price tracking that helps you shop smarter and save money.</p>
        </div>
      </div>

      <!-- Router view -->
      <router-view />

      <!-- Error Modal -->
      <transition name="fade">
        <div v-if="showErrorModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container">
            <div class="modal-header">
              <h3>Missing Information</h3>
              <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
              <p>Please enter a valid product URL to begin tracking.</p>
            </div>
            <div class="modal-footer">
              <button class="modal-button" @click="closeModal">Understood</button>
            </div>
          </div>
        </div>
      </transition>
    </main>
    <footer class="app-footer">
      <p class="footer-text">Developed by Rahul Rajput © {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      productUrl: '',
      items: [],
      showErrorModal: false
    }
  },
  computed: {
    totalValue() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    }
  },
  methods: {
    handleProductAdd() {
      if (!this.productUrl.trim()) {
        this.showErrorModal = true
        return
      }
      
      // Add product logic
      this.items.push({
        id: Date.now(),
        url: this.productUrl,
        price: 0.00 // Would be populated from your backend
      })
      
      this.productUrl = ''
    },
    closeModal() {
      this.showErrorModal = false
    }
  }
}
</script>

<style>
:root {
  --primary: #2c3e50;
  --primary-dark: #1a252f;
  --primary-light: #3d566e;
  --secondary: #f8f9fa;
  --accent: #3498db;
  --text: #333;
  --text-light: #7f8c8d;
  --background: #f5f7fa;
  --white: #ffffff;
  --border-radius: 6px;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --content-width: 1000px;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body {
  margin: 0;
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

/* Navigation */
.navbar {
  width: 100%;
  max-width: var(--content-width);
  background-color: var(--white);
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  box-shadow: var(--shadow-sm);
  margin: 1rem 0;
  border-radius: var(--border-radius);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: var(--transition);
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--accent);
  transition: var(--transition);
}

.nav-link:hover:after {
  width: 100%;
}

.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.router-link-active:after {
  width: 100%;
}

/* Main Content */
.main-content {
  width: 100%;
  max-width: var(--content-width);
  padding: 2rem;
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  position: relative;
}

/* Search Section */
.search-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-title {
  color: var(--primary);
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.5px;
}

.search-container {
  display: flex;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  transition: var(--transition);
  color: var(--text);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.search-button {
  padding: 0 1.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-button:hover {
  background-color: var(--primary-light);
  transform: translateY(-1px);
}

.button-icon {
  font-size: 1.1rem;
}

.wishlist-total {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text);
  margin-top: 1rem;
}

.total-label {
  color: var(--text-light);
  margin-right: 0.5rem;
}

.total-value {
  font-weight: 600;
  color: var(--primary);
}

/* Instructions Section */
.instructions-section {
  background-color: var(--secondary);
  padding: 1.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  border-left: 4px solid var(--accent);
}

.instructions-title {
  color: var(--primary);
  margin-bottom: 1.25rem;
  font-weight: 600;
  font-size: 1.25rem;
}

.steps {
  padding-left: 1.25rem;
  margin: 1.25rem 0;
  list-style-type: none;
}

.step-item {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: var(--text);
}

.step-item:before {
  content: '→';
  color: var(--accent);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.mission-statement {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.mission-icon {
  color: var(--accent);
  font-size: 1.5rem;
  line-height: 1;
  margin-top: 0.25rem;
}

.mission-statement p {
  margin: 0;
  color: var(--text);
  font-style: italic;
  flex: 1;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: var(--white);
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 400px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transform: translateY(0);
  transition: var(--transition);
}

.modal-header {
  padding: 1.25rem 1.5rem;
  background-color: var(--primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-weight: 500;
  font-size: 1.1rem;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
}

.modal-body {
  padding: 1.5rem;
  color: var(--text);
}

.modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-button {
  padding: 0.5rem 1.25rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
}

.modal-button:hover {
  background-color: var(--primary-light);
}

/* Footer */
.app-footer {
  width: 100%;
  max-width: var(--content-width);
  text-align: center;
  padding: 1.5rem;
  color: var(--text-light);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.footer-text {
  margin: 0;
  letter-spacing: 0.5px;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
    gap: 1rem;
    justify-content: center;
  }
  
  .main-content {
    padding: 1.5rem;
  }

  .search-container {
    flex-direction: column;
  }

  .search-button {
    padding: 0.75rem;
    justify-content: center;
  }
}
</style>