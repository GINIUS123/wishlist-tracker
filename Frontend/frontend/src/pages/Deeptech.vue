<template>
  <div class="tech-page">
    <section class="section">
      <h1>Technical Details</h1>
      <p class="intro-text">
        Behind-the-scenes look at how Wishlist Tracker works and the technologies powering it.
      </p>
    </section>

    <section class="section highlight-section">
      <h2>System Architecture</h2>
      <div class="architecture">
        <div class="arch-component">
          <h3>Frontend</h3>
          <p>Vue 3 Composition API</p>
          <p>Vite for fast builds</p>
          <p>Responsive design</p>
        </div>
        <div class="arch-arrow">→</div>
        <div class="arch-component">
          <h3>Backend</h3>
          <p>Node.js + Express</p>
          <p>REST API endpoints</p>
          <p>JWT Authentication</p>
        </div>
        <div class="arch-arrow">→</div>
        <div class="arch-component">
          <h3>Database</h3>
          <p>MongoDB Atlas</p>
          <p>Mongoose ODM</p>
          <p>Cloud-hosted</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Key Technical Features</h2>
      <div class="tech-features">
        <div class="tech-feature">
          <h3>Automated Scraping</h3>
          <p>Playwright handles product data extraction from e-commerce sites with anti-bot bypass</p>
        </div>
        <div class="tech-feature">
          <h3>Data Processing</h3>
          <p>Background workers clean and normalize scraped data before storage</p>
        </div>
        <div class="tech-feature">
          <h3>Notification System</h3>
          <p>Email alerts are triggered when prices drop below user-defined thresholds</p>
        </div>
      </div>
    </section>

    <section class="section highlight-section">
      <h2>Development Notes</h2>
      <p>
        This project was built by <strong>Rahul Rajput</strong> as a demonstration of full-stack 
        JavaScript development capabilities. The code follows modern practices including:
      </p>
      <ul class="dev-practices">
        <li>Component-based architecture</li>
        <li>Proper error handling</li>
        <li>API rate limiting</li>
        <li>Secure authentication</li>
      </ul>
      <p class="contact-prompt">
        For technical inquiries or collaboration opportunities, contact: 
        <a href="mailto:rr5108393@gmail.com">rr5108393@gmail.com</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DeepTechPage'
}
</script>

<style scoped>
.tech-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intro-text {
  font-size: 1.1rem;
  color: var(--text-light);
}

.architecture {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.arch-component {
  flex: 1;
  min-width: 200px;
  background-color: var(--white);
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #e2e8f0;
}

.arch-arrow {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.5rem;
}

.tech-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.tech-feature {
  background-color: var(--secondary);
  padding: 1.2rem;
  border-radius: var(--border-radius);
}

.dev-practices {
  list-style-type: none;
  padding-left: 0;
  margin: 1rem 0;
}

.dev-practices li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.dev-practices li::before {
  content: "•";
  color: var(--primary);
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

.contact-prompt {
  margin-top: 1.5rem;
  font-style: italic;
}

.contact-prompt a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.contact-prompt a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .architecture {
    flex-direction: column;
  align-items: stretch;
  }
  
  .arch-arrow {
    transform: rotate(90deg);
    text-align: center;
    margin: 0.5rem 0;
  }
}
</style>