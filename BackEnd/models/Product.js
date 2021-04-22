const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productImage: {
      type: String,
    },
    productName: {
      type: String,
    },
    productCategory: {
      type: String,
    },
    productPrice: {
      type: String,
    },
    productQuantity: {
      type: Number,
      default: 0,
    },
    productDescription: {
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
