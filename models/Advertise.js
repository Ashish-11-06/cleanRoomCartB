const mongoose = require('mongoose');

const advertiseSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: null,
    },
    discountPercentage: {
        type: Number,
        default: null,
    },
    startDate: {
        type: Date,
        default: null,
    },
    endDate: {
        type: Date,
        default: null,
    },
    bannerImage: {
        type: String,
        default: null,
    }
});

module.exports = mongoose.model('Advertise', advertiseSchema);