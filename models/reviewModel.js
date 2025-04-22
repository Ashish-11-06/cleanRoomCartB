const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    name: { type: String, required: true },
    email: { type: String, required: true },
    reviewSubject: { type: String, required: true },
    comments: { type: String, required: true },
}, {
    timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Review', reviewSchema);