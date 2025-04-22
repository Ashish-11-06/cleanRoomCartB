const PaymentMethod = require("../models/PaymentMethod");

exports.addPaymentMethod = async(req, res) => {
    try {
        const paymentData = {
            userId: req.body.userId,
            ...req.body
        };
        const payment = new PaymentMethod(paymentData);
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentMethods = async(req, res) => {
    try {
        const payments = await PaymentMethod.find({ userId: req.query.userId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};