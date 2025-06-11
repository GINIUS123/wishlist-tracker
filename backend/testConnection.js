console.log('Hello World');  // This will help us confirm the script is running

const mongoose = require('mongoose');
require('dotenv').config();

console.log('Mongo URI:', process.env.MONGO_URI);  // Check if MONGO_URI is correct

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });
