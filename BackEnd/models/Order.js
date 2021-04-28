const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shippingMethod: {
        type: String,
        required: false
    },
    shippingAddress: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    trackingInformation: {
        type: String,
        required: false
    }   
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);