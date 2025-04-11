const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Your Mongoose model

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:8081', // Allow requests from this origin
}));
app.use(express.json());

// 🔥 Serve static files from uploads/
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://krishnakumar:shanmugam.c2005@cluster0.dwq5ktb.mongodb.net/watchStraps', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection check
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully!');
});

// API to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// API to get product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://192.168.56.1:5000');
});
