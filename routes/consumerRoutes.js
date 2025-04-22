const express = require('express');
const router = express.Router();
const {
    registerConsumer,
    loginConsumer,
    getConsumers,
    getConsumerProfile,
    updateConsumerProfile,
    forgotPassword,
    resetPassword
} = require('../controllers/consumerController');

const { authenticate } = require('../middleware/authMiddleware');



// ✅ Routes
router.post('/signup', registerConsumer);
router.post('/login', loginConsumer);
router.get('/profile/:userId', getConsumerProfile);
router.put('/update-profile/:userId', updateConsumerProfile);
router.get('/list', getConsumers); // ✅ Fetch Consumers Route
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;