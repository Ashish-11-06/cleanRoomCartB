const express = require("express");
const Cart = require("../models/CartModel");

const router = express.Router();

//Cart Controller
// backend/controllers/cartController.js
exports.addCart = async(req, res) => {
    try {
        const {
            userId,
            productId,
            name,
            image,
            price,
            quantity,
            size,
            color,
            height,
            width,
            productCode,
        } = req.body;

        const cart = (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });

        const existingItem = cart.items.find(item =>
            item.productId.toString() === productId &&
            item.size === size &&
            item.color === color &&
            item.height === height &&
            item.width === width &&
            item.productCode === productCode
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name,
                image,
                price,
                quantity,
                size,
                color,
                height,
                width,
                productCode,
            });
        }

        await cart.save();
        res.status(201).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ✅ Get user's cart items
exports.getCart = async(req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        return res.status(200).json(cart.items);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update quantity
exports.updateQuantity = async(req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than zero" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Remove item from cart
exports.deleteCart = async(req, res) => {
    try {
        const { userId } = req.params; // Get userId from URL
        const { productCode } = req.query; // Get productCode from query params

        // Validate productCode
        if (!productCode) {
            return res.status(400).json({ message: "productCode is required" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the item with matching productCode
        cart.items = cart.items.filter((item) => item.productCode !== productCode);

        await cart.save();
        res.status(200).json({ success: true, message: "Item removed", cart });

    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Server error" });
    }
};