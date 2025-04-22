const Advertise = require('../models/Advertise');

// Create new advertisement
exports.createAd = async(req, res) => {
    try {
        const { productName, message, discountPercentage, startDate, endDate } = req.body;

        let bannerImage = req.file ? req.file.filename : null;

        const newAd = new Advertise({
            productName: productName || null, // Use null or default value if not provided
            message: message || null,
            discountPercentage: discountPercentage || null,
            startDate: startDate || null,
            endDate: endDate || null,
            bannerImage: bannerImage,
        });

        const savedAd = await newAd.save();
        res.status(201).json(savedAd);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all advertisements
exports.getAllAds = async(req, res) => {
    try {
        const ads = await Advertise.find();
        res.json(ads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete advertisement by ID
exports.deleteAd = async(req, res) => {
    try {
        const adId = req.params.id;
        const deletedAd = await Advertise.findByIdAndDelete(adId);

        if (!deletedAd) {
            return res.status(404).json({ error: "Advertisement not found" });
        }

        res.status(200).json({ message: "Advertisement deleted successfully", deletedAd });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};