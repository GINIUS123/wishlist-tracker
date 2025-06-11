<template>
  <div class="about-page">
    <section class="section">
      <h1>About Wishlist Tracker</h1>
      <p class="intro-text">
        Wishlist Tracker was created to solve a common problem: manually checking prices 
        on desired products is time-consuming and easy to forget. Our app automates this 
        process so you never miss a good deal.
      </p>
    </section>

    <section class="section highlight-section">
      <h2>Why Use Wishlist Tracker?</h2>
      <ul class="benefits-list">
        <li>Save time by automating price checks</li>
        <li>Never miss a price drop on items you want</li>
        <li>Track price history to identify the best time to buy</li>
        <li>Simple interface with no complicated setup</li>
      </ul>
    </section>

    <section class="section">
      <h2>About the Creator</h2>
      <p>
        Rahul Rajput is a Computer Science student passionate about building practical 
        tools that solve everyday problems. Wishlist Tracker was born from his own 
        frustration with manual price tracking.
      </p>
      <div class="contact-links">
        <a href="mailto:rr5108393@gmail.com" class="contact-link">✉️ Email</a>
        <a href="https://linkedin.com/in/rahul-rajput-9096b1228" target="_blank" class="contact-link">🔗 LinkedIn</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  padding: 2rem;
}

.section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
}

.highlight-section {
  background-color: var(--secondary);
}

h1 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  color: var(--primary-dark);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.benefits-list {
  list-style-type: none;
  padding-left: 0;
}

.benefits-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.benefits-list li::before {
  content: "✓";
  color: var(--primary);
  position: absolute;
  left: 0;
}

.contact-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.contact-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}
</style>