const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // to parse JSON request bodies
app.use(cors()); // to allow cross-origin requests

// Start cron job for price checking
require('./services/priceTracker.js');
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Routes
app.use('/api/auth', authRoutes); // User registration route
app.use('/api/wishlist', wishlistRoutes); // Wishlist item route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
