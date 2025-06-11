const mongoose = require('mongoose');
const WishlistItem = require('../models/WishlistItem');
const fetchPriceWithPlaywright = require('./prizechecker'); // your price fetch function

async function updatePriceForOneItem() {
  await mongoose.connect('your_mongodb_connection_string_here');

  const item = await WishlistItem.findOne(); // get one wishlist item
  if (!item) {
    console.log('No wishlist items found');
    return;
  }

  console.log('Checking price for:', item.url);

  const priceData = await fetchPriceWithPlaywright(item.url);
  if (!priceData) {
    console.log('Failed to fetch price');
    return;
  }

  item.priceHistory.push({
    date: new Date(),
    price: priceData.price,
    currency: priceData.currency,
  });

  await item.save();

  console.log('Updated item:', item);

  mongoose.disconnect();
}

updatePriceForOneItem();
