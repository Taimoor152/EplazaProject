const mongoose = require("mongoose");
require("../models/vendor.model");
require("../models/user.model");
require("../models/employee.model");
const Vendor = mongoose.model("Vendor");
const User = mongoose.model("User");

exports.addVendor = async (req, res, next) => {
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
    const { name, address, number, cnic } = req.body;

    const dbVendor = await Vendor.create({
      name,
      address,
      number,
      cnic,
      user_id
    });

    if (!dbVendor) throw new Error("Vendor not Added");
    return res.json({ dbVendor });
  } catch (error) {
    console.log(error);
    return next(error.message);
  }
};

exports.getAllvendors = async (req, res, next) => {
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

    let SearchData = await Vendor.find({ user_id });
    if (!SearchData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " ID doesn't Exist in Database "
        }
      });
    return res.send(SearchData);
  } catch (error) {
    next(error.message);
  }
};

exports.getVendorById = async (req, res, next) => {
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
    let { id } = req.params;
    let searchVendor = await Vendor.findOne({ _id: id, user_id });
    if (!searchVendor)
      return res.status(404).json({
        error: {
          status: 404,
          message: "ID doesn't Exist in Database"
        }
      });
    return res.send(searchVendor);
  } catch (error) {
    next(error.message);
  }
};
exports.updateVendor = async (req, res, next) => {
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
    let updateVendorData = await Vendor.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          number: req.body.number,
          cnic: req.body.cnic
        }
      },
      { new: true }
    );
    if (!updateVendorData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "ID Doesn't Exist"
        }
      });
    return res.send(updateVendorData);
  } catch (error) {
    next(error.message);
  }
};

exports.deleteVendor = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let removeVendorData = await User.findByIdAndDelete(req.params.id);
    if (!removeVendorData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " ID Doesn't Exist "
        }
      });
    return res.send({ removeVendorData: "Data Deleted Successfully" });
  } catch (error) {
    next(error.message);
  }
};
