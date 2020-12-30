const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String
  },
  company_name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String,
    validate: [
      async email => {
        let count = await mongoose.model("User").count({ email });
        return !count;
      },
      " email address already exist"
    ]
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  cnic: {
    type: Number
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: Boolean,
    default: 1
  },
  tag_line: {
    type: String
  },
  profile: {
    type: String
  },
  number: {
    type: Number
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  }
});

module.exports = mongoose.model("User", userSchema);
