const mongoose = require("mongoose");
require("../models/inventory.model");
require("../models/pos.model");
require("../models/user.model");
const Inventory = mongoose.model("Inventory");
const Sale = mongoose.model("Sale");
const User = mongoose.model("User");

exports.addInventory = async (req, res) => {
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
    let { brand_name, model, properties, vendor_id } = req.body;
    let dbInventory = await Inventory.create({
      brand_name,
      model,
      vendor_id,
      properties,
      user_id
    });
    return res.send(dbInventory);
  } catch (error) {
    return res.send(error.message);
  }
};

exports.getAllInventories = async (req, res) => {
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
    let dbInventory = await Inventory.find({ user_id });
    res.send(dbInventory);
  } catch (err) {
    res.send({ err: err.stack });
  }
};

exports.getInventoryById = async (req, res) => {
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
    let dbInventory = await Inventory.findOne({ _id: id, user_id });
    res.send(dbInventory);
  } catch (error) {
    return next(error.message);
  }
};
exports.updateInventory = async (req, res, next) => {
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
    let updateData = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          brand_name: req.body.brand_name,
          model: req.body.model,
          properties: req.body.properties,
          vendor_id: req.body.vendor_id
        }
      },
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

exports.createSale = async (req, res, next) => {
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
    let { brand_name, model, properties, vendor_id } = req.body;
    let dbItem = await Inventory.findOne({
      brand_name,
      model,
      vendor_id,
      status: 1
    });
    let products = await dbItem.properties.filter(
      ({ color, imei, price }, index) => {
        for (const key in properties) {
          if (properties[key].color == color && properties[key].imei == imei) {
            dbItem.properties.splice(index, 1);
            return { color, imei, price };
          }
        }
      }
    );

    if (dbItem.properties.length < 1)
      await Inventory.findByIdAndUpdate(
        dbItem._id,
        { $set: { status: 0 } },
        { new: true }
      );

    if (products.length < 1)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Products not available" // eslint-disable-line
        }
      });
    let dbSale = await Sale.create({
      brand_name,
      vendor_id,
      model,
      products,
      user_id
    });
    let dbset = await Inventory.findByIdAndUpdate(
      dbItem._id,
      {
        $set: { properties: dbItem.properties }
      },
      { new: true }
    );
    res.send(dbSale);
  } catch (error) {
    return next(error.message);
  }
};

exports.getEntireInventory = async (req, res, next) => {
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

    let dbInventory = await Inventory.find({ user_id });
    res.send(dbInventory);
  } catch (error) {
    next(error.message);
  }
};
