const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Add a new address
router.post('/addresses', addressController.addAddress);

// Get all addresses of a specific user
router.get('/addresses/user/:userId', addressController.getUserAddresses);

// Edit an existing address
router.put('/addresses/edit/:addressId', addressController.updateAddress);

// Delete an address
router.delete('/addresses/delete/:addressId', addressController.deleteAddress);

module.exports = router;