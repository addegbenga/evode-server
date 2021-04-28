const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    socialID: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String
    },
    role: {
      type: String,
      enum: ["role1", "role2"],
      required: true,
      default: "role2",
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      }
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ]
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", UserSchema);
