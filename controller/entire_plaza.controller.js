const mongoose = require("mongoose");
require("../models/entire_plaza.model");
const jwt = require("jsonwebtoken");
const key = "Asdf_1122";
require("../models/inventory.model");
require("../models/user.model");
const Inventory = mongoose.model("Inventory");
const User = mongoose.model("User");

const Entire_Plaza = mongoose.model("entire_Plaza");

exports.createEntirePlaza = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let {
      shop_name,
      mobile_Model,
      mobile_Name,
      Price,
      shop_details
    } = req.body;
    const dbEntirePlaza = await Entire_Plaza.create({
      shop_name,
      mobile_Model,
      mobile_Name,
      Price,
      shop_details
    });
    if (!dbEntirePlaza) throw new Error("EntirePlazaSearch Not Created");
    return res.send({ dbEntirePlaza });
  } catch (error) {
    return next(error.message);
  }
};

exports.getEntireData = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { user_id } = req;
    let dbUser = await User.findById(user_id, ["role_id"]).populate("role_id");
    if (dbUser.role_id.role_name !== "Admin")
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Invalid User" // eslint-disable-line
        }
      });
    getEntireData = await Inventory.find({ user_id });
    if (!getEntireData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " ID doesn't Exist in Database "
        }
      });
    return res.send(getEntireData);
  } catch (error) {
    return next(error.message);
  }
};

exports.getAllEntiresData = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { user_id } = req;
    let dbUser = await User.findById(user_id, ["role_id"]).populate("role_id");
    if (dbUser.role_id.role_name !== "Admin")
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Invalid User" // eslint-disable-line
        }
      });
    getEntireData = await Inventory.find({ user_id });
    if (!getEntireData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Data doesn't Exist in Database "
        }
      });
    return res.send(getEntireData);
  } catch (error) {
    return next(error.message);
  }
};

exports.updateEntireData = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let updateData = await Entire_Plaza.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: { shop_name: req.body.shop_name } },
      { new: true }
    );
    if (!updateData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "ID Doesn't Exist"
        }
      });
    return res.send(updateData);
  } catch (error) {
    next(error.message);
  }
};

exports.deleteEntireRecord = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let removeData = await Entire_Plaza.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    if (!removeData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " ID Doesn't Exist "
        }
      });
    return res.send("Data Deleted Successfully");
  } catch (error) {
    next(error.message);
  }
};


