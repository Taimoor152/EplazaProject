const mongoose = require("mongoose");
require("../models/pos.model");
require("../models/user.model");
require("../models/inventory.model");

const Inventory = mongoose.model("Inventory");
const Sale = mongoose.model("Sale");
const User = mongoose.model("User");
exports.createPos = async (req, res) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let {
      brand_name,
      model,
      products,
      customer_name,
      customer_cnic,
      customer_number,
      customer_address,
      vendor_id
    } = req.body;
    let dbSale = await Sale.create({
      brand_name,
      model,
      products,
      customer_name,
      customer_cnic,
      customer_number,
      customer_address,
      vendor_id
    });
    res.send(dbSale);
  } catch (error) {
    res.send({ error });
  }
};

exports.getPos = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { brand_name, model, vendor_id } = req.body;
    let FetchData = await Sale.find({ brand_name, model, vendor_id });
    if (!FetchData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Data doesn't Exist in Database "
        }
      });
    return res.send(FetchData);
  } catch (error) {
    next(error.message);
  }
};

exports.getPosByid = async (req, res, next) => {
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
    let FetchData = await Sale.findOne({ _id: id, user_id });
    if (!FetchData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Data does not exit in database "
        }
      });
    return res.send(FetchData);
  } catch (error) {
    next(error.message);
  }
};

exports.updatePos = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let updateData = await Sale.findOneAndUpdate(
      req.params.id,
      { $set: { products: req.body.products } },
      { new: true }
    );
    if (!updateData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "data does not update"
        }
      });
    return res.send(updateData);
  } catch (error) {
    next(error.message);
  }
};

exports.deletePos = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { id } = req.params;
    let removeData = await Sale.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: { status: 0 } }
    );
    if (!removeData)
      return res.status(404).json({
        error: {
          status: 404,
          message: " Data does not deleted "
        }
      });
    return res.send("Data Deleted Successfully");
  } catch (error) {
    next(error.message);
  }
};

exports.getPosById = async (req, res, next) => {
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
    let dbInventory = await Sale.find({ user_id });
    res.send(dbInventory);
  } catch (error) {
    return next(error.message);
  }
};
