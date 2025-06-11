// utils/scrapeProduct.js
const { chromium } = require('playwright');

async function scrapeProductData(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 60000 });

  const title = await page.title();

  // You can improve selector logic here based on URL patterns
  let price = 0;
  try {
    const priceText = await page.locator('[data-asin-price], .a-price-whole, .price').first().innerText();
    price = parseFloat(priceText.replace(/[^\d.]/g, ''));
  } catch (e) {
    console.warn('⚠️ Could not extract price. Defaulting to 0.');
  }

  await browser.close();
  return { title, price };
}

module.exports = scrapeProductData;
