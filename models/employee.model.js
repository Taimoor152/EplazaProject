const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema({
  name: {
    type: String
  },
  cnic: {
    type: Number
  },
  phone: {
    type: Number
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
  role_id: {
    type: mongoose.Types.ObjectId,
    ref: "Role"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
});
module.exports = mongoose.model("Employee", employeeSchema);
