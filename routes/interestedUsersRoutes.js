const express = require("express");
const router = express.Router();
const {
    addInterestedUser,
    getInterestedUsers,
    getTopInterestedProducts,
    getTop7InterestedProducts
} = require("../controllers/interestedUserController");

// 📌 Route to add interested user
router.post("/add", addInterestedUser);

// 📌 Route to get all interested users
router.get("/", getInterestedUsers);

// 📌 Route to get top 4 most interested products
router.get("/top-products", getTopInterestedProducts);

// 📌 Route to get top 7 most interested products
router.get("/top-7-products", getTop7InterestedProducts);

module.exports = router;