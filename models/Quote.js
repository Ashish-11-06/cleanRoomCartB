const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    companyName: { type: String },
    serviceInterested: { type: String },
    message: { type: String, required: true },
    attachment: { type: String }, // filename of uploaded PDF
    createdAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;