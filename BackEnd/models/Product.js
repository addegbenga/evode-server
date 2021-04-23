const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
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
    productSold: {
      type: Number,
      default: 0,
    },
    productShipping: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
