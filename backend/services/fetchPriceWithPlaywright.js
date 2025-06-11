const fetchPriceWithPlaywright = require('./path/to/priceChecker'); // Adjust path if needed

async function testPriceChecker() {
  const url = 'https://www.amazon.de/dp/B012NCAQFG'; // Replace with your URL
  const priceData = await fetchPriceWithPlaywright(url);
  console.log(priceData);
}

testPriceChecker();
