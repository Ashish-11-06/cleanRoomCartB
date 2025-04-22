const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer', // Adjust this based on your actual user model name
        required: true
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true
    },
    addressLine2: {
        type: String,
        trim: true,
        default: "" // Explicitly allowing an empty string
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    zip: {
        type: String, // Keeping it string to support all formats
        required: true,
        trim: true
    }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;