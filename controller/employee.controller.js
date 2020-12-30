const mongoose = require("mongoose");
require("../models/employee.model");
require("../models/user.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const key = "Asdf_1122";

const Employee = mongoose.model("Employee");
const User = mongoose.model("User");

exports.createEmployee = async (req, res, next) => {
  try {
    if (!req.isAuth)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Token Expired" // eslint-disable-line
        }
      });
    let { user_id } = req;
    console.log("TCL: exports.createEmployee -> user_id", user_id);
    let dbUser = await User.findById(user_id, ["role_id"]).populate("role_id");
    if (dbUser.role_id.role_name !== "Admin")
      return res.status(404).json({
        error: {
          status: 404,
          message: "Authentication Error : Invalid User" // eslint-disable-line
        }
      });
    let { name, cnic, phone, email, password, role_id } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let dbEmloyee = await Employee.create({
      name,
      cnic,
      phone,
      email,
      password,
      role_id,
      user_id
    });
    res.send({
      dbEmloyee
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.signInEmployee = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let EmployeeDetail = await Employee.findOne({ email }).populate("role_id");
    if (!EmployeeDetail)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Email does not Exist in Database" // eslint-disable-line
        }
      });
    let check = bcrypt.compareSync(password, EmployeeDetail.password);
    if (!check)
      return res.status(404).json({
        error: {
          status: 404,
          message: "Password is not correct" // eslint-disable-line
        }
      });
    let token = jwt.sign(
      {
        user_id: EmployeeDetail._id
      },
      key,
      { expiresIn: 60 * 15 }
    );
    return res.json({ EmployeeDetail, token });
  } catch (error) {
    return next(error.message);
  }
};
exports.getAllEmployee = async (req, res, next) => {
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
    let getEmployee = await Employee.find({ user_id });
    if (!getEmployee)
      return res.status(404).json({
        error: {
          status: 404,
          message: "id does not found"
        }
      });
    return res.send(getEmployee);
  } catch (error) {
    next(error.message);
  }
};

exports.getEmployee = async (req, res, next) => {
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
    let getEmployees = await Employee.findOne({ _id: id, user_id });
    if (!getEmployees)
      return res.status(404).json({
        error: {
          status: 404,
          message: "id does not found"
        }
      });
    return res.send(getEmployees);
  } catch (error) {
    next(error.message);
  }
};

exports.updateEmployee = async (req, res, next) => {
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

    let updateData = await Employee.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: {
          phone: req.body.phone
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
