const mongoose = require('mongoose');

// Replace with your MongoDB URI or use MongoDB Atlas
const mongoURI = 'mongodb://localhost:27017/priceChecker';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔌 MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
