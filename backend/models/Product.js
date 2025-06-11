const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  priceHistory: [priceHistorySchema], // To store past prices
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate product with user
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
