require("../models/company.model");
require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Company = mongoose.model("company");
const User = mongoose.model("User");

exports.createCompany = async (req, res) => {
  try {
    let { company_name, email, password, address } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let dbCompany = await User.create({
      company_name,
      email,
      password,
      address,
      role_id: "5e18017559249b1c7cd0d863"
    });
    res.send({
      dbCompany
    });
  } catch (error) {
    res.send({ error });
  }
};
exports.getAllCompanies = async (req, res, next) => {
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
    let getallData = await User.find({});
    if (!getallData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "No Data Exist of Companies"
        }
      });
    return res.send(getallData);
  } catch (error) {
    return next(error.message);
  }
};

exports.getCompany = async (req, res, next) => {
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
    let getData = await User.find({ _id: user_id, status: 1 });
    if (!getData)
      return res.status(404).json({
        error: {
          status: 404,
          message: "data does not update"
        }
      });
    return res.send(getData);
  } catch (error) {
    next(error.message);
  }
};

exports.updateCompany = async (req, res, next) => {
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

    const profile = req.file.originalname;
    if (!profile) {
      throw "Please Upload a file";
    }
    let updateData = await User.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: {
          phone: req.body.phone,
          tag_line: req.body.tag_line,
          profile: req.file.originalname
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

exports.deleteCompany = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let removeCompany = await User.findByIdAndDelete(req.params.id);
    if (!removeCompany)
      return res.status(404).json({
        error: {
          status: 404,
          message: " ID Doesn't Exist "
        }
      });
    return res.send({ removeCompany: "Data Deleted Successfully" });
  } catch (error) {
    next(error.message);
  }
};
