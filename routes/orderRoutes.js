const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrder);
router.get('/all-orders', orderController.getAllOrders);
// Change the route path to match the frontend request
router.put('/status/:orderId', orderController.updateOrderStatus);

router.get('/user-orders/:userId', orderController.getUserOrders);





module.exports = router;