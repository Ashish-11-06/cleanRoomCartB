const express = require("express");
const router = express.Router();
const { addPaymentMethod, getPaymentMethods } = require("../controllers/paymentController");

// Add payment method
router.post("/payment-methods", addPaymentMethod);

// Get payment methods
router.get("/payment-methods", getPaymentMethods);

module.exports = router;