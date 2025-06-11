const { sendPriceDropEmail } = require('./emailService');

// Example values for testing
const to = 'sunilrajput11265@gmail.com';  // 👈 Replace with your email address
const productName = 'Dolce & Gabbana The One Parfum';
const oldPrice = 99.99;
const newPrice = 77.90;
const productUrl = 'https://www.amazon.de/dp/B012NCAQFG';

sendPriceDropEmail(to, productName, oldPrice, newPrice, productUrl);
