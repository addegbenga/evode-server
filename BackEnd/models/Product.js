const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],
    price: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shippingZone: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
