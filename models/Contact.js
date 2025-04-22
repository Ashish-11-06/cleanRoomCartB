const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String }, // Optional
    email: { type: String, required: true },
    orderNumber: { type: String }, // Optional
    companyName: { type: String }, // Optional
    comments: { type: String, required: true },
    status: { type: String, default: 'pending' }, // New status field
    createdAt: { type: Date, default: Date.now }, // Store submission time
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;