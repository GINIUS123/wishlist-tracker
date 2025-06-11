const { chromium } = require('playwright');
const selectors = require('./selectors');

// Testing function to fetch price from Amazon
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

    // Wait for price selector
    await page.waitForSelector(selector, { timeout: 8000 });

    const rawPrice = await page.$eval(selector, el => el.textContent.trim());
    console.log(`💬 Raw price from ${domain}: ${rawPrice}`);

    // Clean the price string
    const clean = rawPrice.replace(/[^\d,.-]/g, '');
    let price;

    if (/,/.test(clean) && !/\.\d{2}$/.test(clean)) {
      price = parseFloat(clean.replace(/\./g, '').replace(',', '.'));
    } else if (/\d+\.\d{2}$/.test(clean)) {
      price = parseFloat(clean.replace(/,/g, ''));
    } else {
      price = parseFloat(clean.replace(/,/g, ''));
    }

    const currencyMatch = rawPrice.match(/[€$£₹]/) || ['€'];
    const currency = currencyMatch[0];

    return { price, currency };
  } catch (err) {
    console.error(`❌ Error fetching price from ${url}:`, err.message);
    return null;
  } finally {
    await browser.close();
  }
}

// Test for multiple Amazon URLs
(async () => {
  const urls = [
    'https://www.amazon.de/-/en/Dolce-Gabbana-One-Parfum-Spray/dp/B012NCAQFG/?_encoding=UTF8&ref_=pd_hp_d_btf_ci_mcx_mr_ca_id_hp_d',
    'https://www.amazon.de/Giorgio-Armani-Stronger-Intense-Parfum/dp/B07JZN97N4/ref=pd_rhf_gw_s_pd_crcd_d_sccl_1_2/259-0221513-9891020',
    'https://www.amazon.de/-/en/WD_BLACK-SN850X-Internal-Gaming-Technology/dp/B0D9WT512W/?_encoding=UTF8&ref_=pd_hp_d_atf_unk'
  ];

  for (const url of urls) {
    console.log(`🌐 Testing: ${url}`);
    const result = await fetchPriceWithPlaywright(url);

    if (result) {
      console.log(`✅ Price found: ${result.price} ${result.currency}`);
    } else {
      console.log('❌ Could not extract price.');
    }
  }
})();
