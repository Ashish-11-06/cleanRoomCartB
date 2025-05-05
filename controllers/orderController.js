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

exports.getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find().populate('userID', 'email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Add this to the bottom of your file
// orderController.js
exports.updateOrderStatus = async(req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, { orderStatus: newStatus }, { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.getUserOrders = async(req, res) => {
    try {
        console.log('[Backend] Fetching orders for user:', req.params.userId);
        const orders = await Order.find({ userID: req.params.userId })
            .populate('items.productID', 'productCode name images')
            .sort({ orderDate: -1 })
            .lean();

        console.log(`[Backend] Found ${orders.length} orders for user ${req.params.userId}`);
        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error('[Backend] Error:', err.message);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};