const mongoose = require("mongoose");
require("../models/user.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const key = "Asdf_1122";

const User = mongoose.model("User");
exports.signInUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let dbUser = await User.findOne({ email }).populate("role_id");
    if (!dbUser)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Email does not Exist in Database" // eslint-disable-line
        }
      });
    let check = bcrypt.compareSync(password, dbUser.password);
    if (!check)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Password is not correct" // eslint-disable-line
        }
      });
    let token = jwt.sign(
      {
        user_id: dbUser._id
      },
      key,
      { expiresIn: 60 * 15 }
    );
    return res.json({ dbUser, token });
  } catch (error) {
    return next(error.message);
  }
};
