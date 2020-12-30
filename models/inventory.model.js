const mongoose = require("mongoose");
const schema = mongoose.Schema;

const inventorySchema = new schema({
  brand_name: {
    type: String,
    required: [true, "Brand Name is Required"],
    max: 20
  },
  model: {
    type: String,
    required: [true, "Model Number is required"],
    max: 50
  },
  properties: [
    {
      color: String,
      imei: Number,
      price: String
    }
  ],
  vendor_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Enter Vendor_id "],
    ref: `Vendor`
  },
  status: {
    type: Boolean,
    default: 1
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Inventory", inventorySchema);
