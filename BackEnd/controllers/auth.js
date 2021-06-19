const { User, Votes, Aspirants } = require("../models/User");
const passwordGenerator = require("password-generator");
const { sendTokenResponse } = require("../middleware/utils");

//get logged in user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//register user locally
exports.registration = async (req, res) => {
  const { matric } = req.body;

  try {
    let user = await User.findOne({ matric });

    if (user) {
      return res.status(400).json("User already exist");
    }
    const newUser = await User.create(req.body);

    return res.json({ msg: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err + " Server error");
  }
};

//login user locally
exports.login = async (req, res) => {
  const { matric, password } = req.body;
  try {
    let user = await User.findOne({ matric });
    if (password !== user.password) {
      return res.json({ msg: "passowrd does not match" });
    }
    if (!user) {
      return res.status(400).json("user not found");
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err + " Server error");
  }
};

exports.vote = async (req, res) => {
  try {
    const { ...args } = req.body;

    const resp = await User.findOneAndUpdate(
      { _id: req.user._id },

      args,
      {
        upsert: true,
      }
    );
    return res.json(resp);
  } catch (error) {
    console.log(error);
  }
};

const countVote = async (req, res) => {
  try {
    const aspirants = await Aspirants.findByid(req.body.aspirantId);
    const user = await User.find({ _id: { $in: [aspirants.vote] } });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const resp = await User.find().populate("votes");
    return res.json(resp);
  } catch (error) {
    console.log(error);
  }
};

exports.aspirant = async (req, res) => {
  try {
    const { ...args } = req.body;

    const resp = await Aspirants.create(args);
    return res.json(resp);
  } catch (error) {
    console.log(error);
  }
};

exports.getAspirants = async (req, res) => {
  try {
    const aspirant = await Aspirants.find();
    return res.json(aspirant);
  } catch (error) {
    console.log(error);
  }
};

exports.createAllStudent = async (req, res) => {
  try {
    const newUsers = await User.insertMany(req.body);
    return res.json(newUsers);
  } catch (error) {
    console.log(error);
  }
};

exports.updateAllStudent = async (req, res) => {
  try {
    const resp = await User.find();

    const maped = resp.map((item) => {
      let other = item;
      console.log(other);
      other.password = passwordGenerator(6, false);
      return other;
    });
    const newUpdate = await User.bulkWrite(
      maped.map((point) => {
        return {
          updateOne: {
            filter: {
              _id: point._id,
            },
            update: {
              $set: {
                password: point.password,
              },
            },
            upsert: true,
          },
        };
      })
    );
    return res.json(newUpdate);
  } catch (error) {
    console.log(error);
  }
};
