const Address = require('../models/Address');

// Add a new address
exports.addAddress = async(req, res) => {
    try {
        const { userId, addressLine1, addressLine2, city, state, country, zip } = req.body;

        if (!userId || !addressLine1 || !city || !state || !country || !zip) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newAddress = new Address({
            userId,
            addressLine1,
            addressLine2: addressLine2 || "", // Default to empty if not provided
            city,
            state,
            country,
            zip
        });

        await newAddress.save();
        res.status(201).json({ message: "Address added successfully!", address: newAddress });

    } catch (error) {
        console.error("Add Address Error:", error);
        res.status(500).json({ message: "Server error while adding address.", error: error.message });
    }
};

// Get all addresses of a user
exports.getUserAddresses = async(req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ message: "User ID is required." });

        const addresses = await Address.find({ userId }).populate("userId", "firstName lastName email");

        if (addresses.length === 0) {
            return res.status(200).json({ message: "No addresses found for this user.", addresses: [] });
        }

        res.status(200).json({ addresses });

    } catch (error) {
        console.error("Fetch Address Error:", error);
        res.status(500).json({ message: "Server error while fetching addresses.", error: error.message });
    }
};

// Update an existing address
exports.updateAddress = async(req, res) => {
    try {
        const { addressId } = req.params;
        const { addressLine1, addressLine2, city, state, country, zip } = req.body;

        if (!addressId) return res.status(400).json({ message: "Address ID is required." });

        const updatedAddress = await Address.findByIdAndUpdate(
            addressId, { addressLine1, addressLine2, city, state, country, zip }, { new: true, runValidators: true } // Return updated document & validate input
        );

        if (!updatedAddress) return res.status(404).json({ message: "Address not found." });

        res.status(200).json({ message: "Address updated successfully!", address: updatedAddress });

    } catch (error) {
        console.error("Update Address Error:", error);
        res.status(500).json({ message: "Server error while updating address.", error: error.message });
    }
};

// Delete an address
exports.deleteAddress = async(req, res) => {
    try {
        const { addressId } = req.params;
        if (!addressId) return res.status(400).json({ message: "Address ID is required." });

        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) return res.status(404).json({ message: "Address not found." });

        res.status(200).json({ message: "Address deleted successfully!", deletedAddress });

    } catch (error) {
        console.error("Delete Address Error:", error);
        res.status(500).json({ message: "Server error while deleting address.", error: error.message });
    }
};