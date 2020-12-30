const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vendorSchema = new schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  cnic: {
    type: Number,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Vendor", vendorSchema);
