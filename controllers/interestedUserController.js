const InterestedUser = require("../models/InterestedUser");
const Product = require("../models/ProductModel");

// 📌 Add Interested User
exports.addInterestedUser = async(req, res) => {
    try {
        const { userName, email, phone, productId } = req.body;

        if (!userName || !email || !phone || !productId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user has already marked this product as interested
        const existingEntry = await InterestedUser.findOne({ email, productId });
        if (existingEntry) {
            return res.status(409).json({ message: "Product already marked as interested" });
        }

        const newUser = new InterestedUser({ userName, email, phone, productId });
        await newUser.save();

        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Get All Interested Users
exports.getInterestedUsers = async(req, res) => {
    try {
        const users = await InterestedUser.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Get Top 4 Most Interested Products
exports.getTopInterestedProducts = async(req, res) => {
    try {
        const topProducts = await InterestedUser.aggregate([
            { $group: { _id: "$productId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ]);

        const productIds = topProducts.map((product) => product._id);
        const products = await Product.find({ _id: { $in: productIds } });

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Get Top 7 Most Interested Products
exports.getTop7InterestedProducts = async(req, res) => {
    try {
        const topProducts = await InterestedUser.aggregate([
            { $group: { _id: "$productId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 7 }
        ]);

        const productIds = topProducts.map((product) => product._id);
        const products = await Product.find({ _id: { $in: productIds } });

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};