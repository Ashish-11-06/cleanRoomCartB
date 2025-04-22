const express = require('express');
const router = express.Router();
const { createReview, getProductReviews } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/:productId', getProductReviews);


module.exports = router;