const mongoose = require("mongoose");
const schema = mongoose.Schema;

const saleSchema = new schema({
  brand_name: [
    {
      type: String
    }
  ],
  model: [
    {
      type: String
    }
  ],
  vendor_id: {
    type: String
  },
  products: [
    {
      _id: {
        type: false
      },
      color: {
        type: String
      },

      imei: {
        type: String
      },
      price: {
        type: String
      }
    }
  ],
  customer_name: {
    type: String
  },
  customer_cnic: {
    type: String
  },
  customer_number: {
    type: String
  },
  customer_address: {
    type: String
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
module.exports = mongoose.model("Sale", saleSchema);
