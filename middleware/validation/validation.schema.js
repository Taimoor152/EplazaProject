const Joi = require("joi");
const validation = {
  // Role Validation //
  Role: Joi.object().keys({
    role_name: Joi.string().required(),
    permissions: Joi.object({
      dashboard: Joi.boolean().required(),
      inventory: Joi.boolean().required(),
      pos: Joi.boolean().required(),
      broadcast: Joi.boolean().required(),
      entire_plaza: Joi.boolean().required(),
      setting: Joi.boolean()
    }).required()
  }),

  // Compnany Validation //
  company: Joi.object().keys({
    company_name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
    address: Joi.string().required()
  }),

  // company Update Profile
  com: Joi.object().keys({
    // profile: Joi.string().required(),
    // tag_line: Joi.string().required(),
    // phone: Joi.number().required()
  }),

  //Company SignIn
  comp: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),

  // Employee Validation // Clear
  employee: Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.number().required(),
    email: Joi.string()
      .email()
      .required(),
    cnic: Joi.number().required(),
    password: Joi.string().required(),
    role_id: Joi.string().required()
  }),
  //Employee SignIn
  emp: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }),

  // Entire_Plaza Validation //
  plaza: Joi.object().keys({
    shop_name: Joi.string().required(),
    mobile_Model: Joi.string().required(),
    mobile_Name: Joi.string().required(),
    Price: Joi.string().required(),
    shop_details: Joi.object({
      shop_address: Joi.string().required(),
      phone: Joi.number().required()
    })
  }),

  // Inventory Validation //
  inventory: Joi.object().keys({
    brand_name: Joi.string().required(),
    model: Joi.string().required(),
    properties: Joi.array().items(
      Joi.object({
        color: Joi.string().required(),
        imei: Joi.number().required(),
        price: Joi.string().required()
      })
    ),
    vendor_id: Joi.string().required()
  }),

  // POS Validaton //
  pos: Joi.object().keys({
    brand_name: Joi.array()
      .items(Joi.string())
      .required(),
    model: Joi.array()
      .items(Joi.string())
      .required(),
    products: Joi.array()
      .items(
        Joi.object({
          color: Joi.string().required(),
          imei: Joi.number().required(),
          price: Joi.string().required()
        })
      )
      .required(),
    customer_name: Joi.string().required(),
    customer_cnic: Joi.number().required(),
    customer_number: Joi.number().required(),
    customer_address: Joi.string().required(),
    vendor_id: Joi.string().required()
  }),

  // Vendor Validation //
  vendor: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.number().required(),
    cnic: Joi.number().required()
  })
};

module.exports = validation;
