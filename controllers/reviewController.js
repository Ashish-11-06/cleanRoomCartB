const Review = require('../models/reviewModel');
const mongoose = require('mongoose');
const Product = require('../models/ProductModel'); // Import Product model

const createReview = async(req, res) => {
    try {
        const { productId, rating, name, email, reviewSubject, comments } = req.body;

        // Validate required fields
        if (!productId || !rating || !name || !email || !reviewSubject || !comments) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = new Review({
            productId,
            rating,
            name,
            email,
            reviewSubject,
            comments,
        });

        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: savedReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
};

const getProductReviews = async(req, res) => {
    try {
        const productId = req.params.productId;

        // Validate productId (optional, but recommended)
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const reviews = await Review.find({ productId: productId });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ message: 'Failed to fetch product reviews', error: error.message });
    }
};

module.exports = {
    createReview,
    getProductReviews
};