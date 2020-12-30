const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roleSchema = new schema({
  role_name: {
    type: String,
    required: true
  },
  permissions: {
    dashboard: {
      type: Boolean,
      default: false,
      required: true
    },
    inventory: {
      type: Boolean,
      default: false,
      required: true
    },
    pos: {
      type: Boolean,
      default: false,
      required: true
    },
    broadcast: {
      type: Boolean,
      default: false,
      required: true
    },
    entire_plaza: {
      type: Boolean,
      default: false,
      required: true
    },
    setting: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Role", roleSchema);
