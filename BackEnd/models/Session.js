const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        device: {
            type: String,
        },
        browser: {
            type: String
        },
        location: {
            type: {
              type: String, 
              enum: ['Point'], 
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
        },
        status: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Session", sessionSchema);