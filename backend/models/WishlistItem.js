const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  userId: String,
  url: String,
  title: String,
  priceHistory: [
    {
      price: Number,
      currency: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
