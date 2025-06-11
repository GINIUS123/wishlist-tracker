console.log('🎯 Price Checker initialized');
console.log('⏱ Running scheduled price check...');

const cron = require('node-cron');
const { chromium } = require('playwright');
const WishlistItem = require('../models/WishlistItem');
const selectors = require('./selectors');

// Function to fetch price using Playwright
async function fetchPriceWithPlaywright(url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const domain = new URL(url).hostname;
    const selector = selectors[domain]?.price;

    if (!selector) {
      throw new Error(`No selector found for ${domain}`);
    }

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector(selector, { timeout: 8000 });

    const rawPrice = await page.$eval(selector, el => el.textContent.trim());
    console.log(`💬 Raw price from ${domain}: ${rawPrice}`);

    const match = rawPrice.match(/[\d.,]+/);
    if (!match) {
      throw new Error(`Could not extract price from: ${rawPrice}`);
    }

    const clean = match[0];
    let price;

    if (clean.includes(',') && !clean.includes('.')) {
      price = parseFloat(clean.replace(',', '.'));
    } else {
      price = parseFloat(clean.replace(/,/g, ''));
    }

    const currencyMatch = rawPrice.match(/[€$£₹]/) || ['€'];
    const currency = currencyMatch[0];

    console.log(`✅ Price found: ${price} ${currency}`);
    return { price, currency };
  } catch (err) {
    console.error(`❌ Error fetching price from ${url}:`, err.message);
    return null;
  } finally {
    await browser.close();
  }
}

// Function to check all wishlist prices now
async function fetchAllPricesNow() {
  console.log('⏳ Running initial price check on startup...');

  try {
    const wishlistItems = await WishlistItem.find();

    for (const item of wishlistItems) {
      const { url, priceHistory } = item;
      const priceData = await fetchPriceWithPlaywright(url);

      if (priceData) {
        const { price, currency } = priceData;
        const lastPrice = priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].price : null;

        if (lastPrice && price < lastPrice) {
          console.log(`📉 Price dropped for ${url}: ${lastPrice} → ${price}`);
          // Optionally send email notification here
        }

        priceHistory.push({
          date: new Date(),
          price,
          currency
        });

        await WishlistItem.updateOne(
          { _id: item._id },
          { $set: { priceHistory } }
        );

        console.log(`✅ Price for ${url} updated: ${price} ${currency}`);
      }
    }
  } catch (err) {
    console.error('❌ Error during initial price check:', err);
  }
}

// Cron job to check prices every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('⏰ Running scheduled price check...');

  await fetchAllPricesNow();
});

// Run once when the server starts
(async () => {
  await fetchAllPricesNow();
})();

module.exports = fetchPriceWithPlaywright;
