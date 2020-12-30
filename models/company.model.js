const mongoose = require("mongoose");
const schema = mongoose.Schema;

const companySchema = new schema({
  company_name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  }
});

module.exports = mongoose.model("company", companySchema);
