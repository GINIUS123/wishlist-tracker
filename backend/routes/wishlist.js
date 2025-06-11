const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/WishlistItem');
const { chromium } = require('playwright');

// 🧠 Utility function to scrape product title and price
async function scrapeProductData(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 60000 });

  const title = await page.title();

  let price = 0;
  try {
    const priceText = await page
      .locator('.a-price .a-offscreen, .price, .a-price-whole')
      .first()
      .innerText();
    price = parseFloat(priceText.replace(/[^\d.]/g, ''));
  } catch (err) {
    console.warn('⚠️ Could not extract price, defaulting to 0.');
  }

  await browser.close();
  return { title, price };
}

// ✅ GET wishlist items by userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await WishlistItem.find({ userId });
    res.status(200).json(items);
  } catch (err) {
    console.error('❌ Fetch Wishlist Error:', err);
    res.status(500).json({ message: 'Error fetching wishlist items' });
  }
});

// ✅ POST a new wishlist item with scraped title and price
router.post('/', async (req, res) => {
  const { userId, productUrl } = req.body;

  if (!userId || !productUrl) {
    return res.status(400).json({ message: 'Missing userId or productUrl' });
  }

  try {
    const { title, price } = await scrapeProductData(productUrl);

    const newItem = new WishlistItem({
      userId,
      url: productUrl,
      title,
      priceHistory: [
        {
          price,
          currency: '€',
          date: new Date(),
        },
      ],
    });

    await newItem.save();
    res.status(201).json({ message: 'Wishlist item added', item: newItem });
  } catch (err) {
    console.error('❌ Wishlist Save Error:', err);
    res.status(500).json({ message: 'Error adding item to wishlist' });
  }
});

module.exports = router;
