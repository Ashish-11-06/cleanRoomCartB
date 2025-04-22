const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Now required
    cardNumber: { type: String, required: true },
    cvv: { type: String, required: true },
    expiry: { type: String, required: true },
    cardholderName: { type: String, required: true },
    billingAddress: {
        firstName: String,
        lastName: String,
        company: String,
        phone: String,
        address1: String,
        address2: String,
        city: String,
        country: String,
        state: String,
        zip: String,
    },
});

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);