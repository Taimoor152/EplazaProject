const mongoose = require("mongoose");
require("../models/role.model");
require("../models/user.model");
const Joi = require("joi");

const Role = mongoose.model("Role");
const User = mongoose.model("User");

exports.createRole = async (req, res, next) => {
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
    let { role_name, permissions } = req.body;
    let dbRole = await Role.create({ role_name, permissions, user_id });
    if (!dbRole)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Role and Permission Not Created"
        }
      });

    return res.json(dbRole);
  } catch (error) {
    next(error.message);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { role_id } = req.params;
    let updateData = await Role.findByIdAndUpdate(
      mongoose.Types.ObjectId(role_id),
      { $set: { permissions: req.body.permissions } },
      { new: true }
    );
    if (!updateData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "There is no Role_id Exist"
        }
      });
    return res.send(updateData);
  } catch (error) {
    next(error.message);
  }
};
exports.getAllRole = async (req, res, next) => {
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
    let AllData = await Role.find({ user_id });
    if (!AllData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " No Data Found in DataBase "
        }
      });
    return res.send(AllData);
  } catch (error) {
    next(error.message);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { id } = req.params;
    let FetchData = await Role.findOne({ _id: id, user_id });
    if (!FetchData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Role_id doesn't Exist in Database "
        }
      });
    return res.send(FetchData);
  } catch (error) {
    next(error.message);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { role_id } = req.params;
    let removeData = await User.findOneAndDelete({ role_id });
    if (!removeData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Data on Role_id Doesn't Exist "
        }
      });
    return res.send("Data Deleted Successfully");
  } catch (error) {
    next(error.message);
  }
};
