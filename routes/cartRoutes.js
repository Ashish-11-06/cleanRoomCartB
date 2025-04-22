const express = require("express");
const { addCart, getCart, updateQuantity, deleteCart } = require('../controllers/cartController')

const router = express.Router();

// Add cart
router.post("/add", addCart);

// Get cart
router.get("/get/:userId", getCart);

// Update quantity
router.put("/update/:userId/:productId", updateQuantity);


// Delete cart item
router.delete("/remove/:userId", deleteCart);

// Delete cart item (now requires variant details)


module.exports = router;