// services/testPriceChecker.js
const { fetchPriceWithPlaywright } = require('./priceChecker');

const testUrls = [
  'https://www.amazon.de/-/en/Azzaro-Most-Wanted-Perfume-Parfum/dp/B09VN62HF3',
  'https://www.nike.com/de/t/one-dri-fit-2-in-1-shorts-mit-hohem-taillenbund-fur-8tTzm4/DX6016-405'
];

(async () => {
  for (const url of testUrls) {
    console.log(`\n🔎 Testing price for: ${url}`);
    const result = await fetchPriceWithPlaywright(url);
    if (result) {
      console.log(`✅ Price: ${result.price} ${result.currency}`);
    } else {
      console.log('❌ Failed to fetch price');
    }
  }
})();
