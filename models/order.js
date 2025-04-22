const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true },
    orderDate: { type: Date, default: Date.now },
    shippingAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
    },
    paymentMethod: { type: String, default: 'COD' },
    orderTotal: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' },
    items: [{
        productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        itemPrice: { type: Number, required: true },
        productCode: { type: String },
    }, ],
});

module.exports = mongoose.model('Order', orderSchema);