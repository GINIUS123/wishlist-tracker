const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape product price
const scrapePrice = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Example: You need to modify this selector based on the website structure
    const price = parseFloat($('.product-price').text().replace('$', '').trim());

    if (isNaN(price)) {
      throw new Error('Price not found');
    }

    return price;
  } catch (err) {
    console.error('Error scraping price:', err.message);
    throw new Error('Failed to scrape product price');
  }
};

module.exports = scrapePrice;
require('./services/priceTracker');
