const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the organization name"],
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Manager"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
