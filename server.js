const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/adminRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const categoryRoutes = require('./routes/categoryRoutes2');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');

const contactRoutes = require('./routes/contactRoutes');
const subProductRoutes = require('./routes/subProductRoutes');

const cartRoutes = require('./routes/cartRoutes');
const interestedUsersRoutes = require('./routes/interestedUsersRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require("./routes/paymentRoutes");
const advertiseRoutes = require('./routes/advertise'); // This line is already added
const quoteRoutes = require('./routes/quoteRoutes');

// New imports for reviews
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');


const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Serving uploads from:", path.join(__dirname, "uploads"));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/advertise', advertiseRoutes); // This route is correctly set up

// app.use('/api/contact', contactRoutes);
app.use('/api/subproduct', subProductRoutes);

app.use('/api/contact', contactRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/interested-users", interestedUsersRoutes);
app.use('/api/address', addressRoutes);

// Add review routes
app.use('/api/reviews', reviewRoutes);
app.use("/api", paymentRoutes);
app.use("/api/quote", quoteRoutes);
app.use('/api/order', orderRoutes);

// Ensure the advertise route is correctly set up
// This part is already done correctly

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`💻 Time to code, genius! Remember: bugs are just unexpected features.Have a good backend journey 🐞✨`);
});