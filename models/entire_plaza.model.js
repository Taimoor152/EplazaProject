const mongoose = require("mongoose");
const schema = mongoose.Schema;

const entire_plazaSchema = new schema({
  shop_name: { type: String, required: [true, "Shop_Name is Required"] },
  mobile_Model: { type: String, required: [true, "Mobile_Model is Required"] },
  mobile_Name: { type: String, required: [true, "Mobile_Name is Required"] },
  Price: { type: String, required: [true, "Mobile_Price Required"] },
  shop_details: {
    shop_address: {
      type: String,
      required: [true, "Shop_address is Required"]
    },
    phone: { type: String, required: [true, "Phone with Model is Required"] }
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("entire_Plaza", entire_plazaSchema);
