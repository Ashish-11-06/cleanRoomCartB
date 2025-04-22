const Order = require('../models/order');
const mongoose = require('mongoose'); // ADD THIS LINE
const moment = require('moment');

// Function to generate a user-friendly order ID
async function generateOrderID(db) {
    const today = moment().format('YYYYMMDD');
    const collection = db.collection('order_sequences');
    const sequenceDoc = await collection.findOneAndUpdate({ _id: today }, { $inc: { sequence_value: 1 } }, { upsert: true, returnDocument: 'after' });

    const sequenceNumber = String(sequenceDoc.sequence_value).padStart(4, '0');
    const orderID = `ORD-${today}-${sequenceNumber}`;
    return orderID;
}

exports.createOrder = async(req, res) => {
    try {
        const { userID, shippingAddress, paymentMethod, orderTotal, items } = req.body;

        // Generate a unique, user-identifiable order ID
        const db = mongoose.connection.db; // Get the MongoDB database instance
        const orderID = await generateOrderID(db);

        const order = new Order({
            orderID: orderID,
            userID,
            shippingAddress,
            paymentMethod,
            orderTotal,
            items,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};