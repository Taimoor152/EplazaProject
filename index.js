const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const userController = require("./controller/user.controller");
const roleController = require("./controller/role.controller");
const vendorController = require("./controller/vendor.controller");
const inventoryController = require("./controller/inventory.controller");
const Entire_PlazaController = require("./controller/entire_plaza.controller");
const companyController = require("./controller/company.controller");
const employeeController = require("./controller/employee.controller");
const sellController = require("./controller/pos.controller");
const validator = require("./middleware/validation/validator");
const validation = require("./middleware/validation/validation.schema");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const uploads = multer({ storage: storage }).single("profile");

mongoose.connect("mongodb://localhost:27017/EPLAZA", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const directory = path.join(__dirname, "/uploads/");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(directory));

//////////// Company Profile //////////////
app.post(
  "/create/company",
  validator(validation.company),
  companyController.createCompany
);
app.get("/sign/in", validator(validation.comp), userController.signInUser);
app.get("/get/company/by/:id", isAuth, companyController.getCompany);
app.get("/get/all/companies", isAuth, companyController.getAllCompanies);
app.put(
  "/update/company/:id",
  isAuth,
  validator(validation.com),
  uploads,
  companyController.updateCompany
);
app.delete("/delete/company/by/:id", isAuth, companyController.deleteCompany);
/////////// Vendor //////////////
app.post(
  "/create/vendor",
  validator(validation.vendor),
  isAuth,
  vendorController.addVendor
);
app.get("/get/all/vendors", isAuth, vendorController.getAllvendors);
app.get("/get/vendor/by/:id", isAuth, vendorController.getVendorById);
app.put(
  "/update/vendor/by/:id",
  isAuth,
  validator(validation.vendor),
  vendorController.updateVendor
);
app.delete("/delete/vendor/by/:id", isAuth, vendorController.deleteVendor);

/////////// Inventory /////////////
app.post(
  "/create/inventory",
  isAuth,
  validator(validation.inventory),
  inventoryController.addInventory
);
app.get("/get/All/inventories", isAuth, inventoryController.getAllInventories);
app.get("/get/inventory/by/:id", isAuth, inventoryController.getInventoryById);
app.put(
  "/update/inventory/by/:id",
  isAuth,
  validator(validation.inventory),
  inventoryController.updateInventory
);
app.post("/create/sale", isAuth, inventoryController.createSale);
app.get(
  "/get/entire/inventory/search",
  isAuth,
  inventoryController.getEntireInventory
);

//////////// Point of sale ////////////////
app.post(
  "/create/pos",
  isAuth,
  validator(validation.pos),
  sellController.createPos
);
app.get("/get/pos", isAuth, sellController.getPos);
app.get("/get/pos/:id", isAuth, sellController.getPosByid);
app.put("/update/pos", isAuth, sellController.updatePos);
app.delete("/delete/pos/by/:id", isAuth, sellController.deletePos);
app.get("/get/pos/by/user_id", isAuth, sellController.getPosById);

//////////// Role ///////////////
app.post(
  "/create/role",
  validator(validation.Role),
  isAuth,
  roleController.createRole
);
app.put(
  "/update/role/by/:role_id",
  validator(validation.Role),
  isAuth,
  roleController.updateRole
);
app.get("/get/all", isAuth, roleController.getAllRole);
app.get("/User/get/by/:role_id", isAuth, roleController.getUser);
app.delete("/delete/user/by/:role_id", isAuth, roleController.deleteUser);

//////////// Employee ////////////////
app.post(
  "/create/employee",
  validator(validation.employee),
  isAuth,
  employeeController.createEmployee
);
app.get(
  "/signin/employee",
  validator(validation.emp),
  employeeController.signInEmployee
);
app.get("/get/employee/:id", isAuth, employeeController.getEmployee);
app.get("/get/all/employees", isAuth, employeeController.getAllEmployee);
app.put("/update/employee/by/:id", isAuth, employeeController.updateEmployee);

//////////// Entire Plaza ////////////
app.post(
  "/create/Entire_Plaza",
  validator(validation.plaza),
  isAuth,
  Entire_PlazaController.createEntirePlaza
);
app.get("/get/search", isAuth, Entire_PlazaController.getEntireData);
app.get("/get/All/entires", isAuth, Entire_PlazaController.getAllEntiresData);
app.put(
  "/update/entires/by/:id",
  validator(validation.plaza),
  isAuth,
  Entire_PlazaController.updateEntireData
);
app.delete(
  "/delete/entire/by/:id",
  isAuth,
  Entire_PlazaController.deleteEntireRecord
);


let arr = [1, 22, 15, 0];
console.log(Math.max.apply(null, arr))
console.log(Math.min.apply(null, arr))

app.listen(4000, () => console.log("server Started Through Port 4000 "));
