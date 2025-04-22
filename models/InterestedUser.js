// models/InterestedUser.js
const mongoose = require("mongoose");

const interestedUserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String }, // Optional field
    lastName: { type: String }, // Optional field
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, default: new Date().toLocaleString() },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("InterestedUser", interestedUserSchema);