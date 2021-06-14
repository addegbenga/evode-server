const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passwordGenerator = require("password-generator");

const aspirantSchema = new mongoose.Schema(
  {
    voteCount: {
      type: Number,
      default: 0,
    },
    firstName: String,
    lastName: String,
    position: String,
    photoUrl: String,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    department: {
      type: String,
    },
    level: {
      type: Number,
    },
    votes: [
      {
        type: ObjectId,
        ref: "Aspirant",
      },
    ],
    password: {
      type: String,
      default: passwordGenerator(6, false),
    },
  },
  {
    timestamps: true,
  }
);

// //Encrypt password using bcrypt
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// //Password matcher
// userSchema.methods.matchPassword = async function (enteredPass) {
//   return await bcrypt.compare(enteredPass, this.password);
// };

//sign jwt with refresh token
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//sign jwt with activation token
userSchema.methods.getActivationToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACTIVATION_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

const Aspirants = mongoose.model("Aspirant", aspirantSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Aspirants };
