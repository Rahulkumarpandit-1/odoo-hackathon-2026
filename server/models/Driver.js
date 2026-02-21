const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  licenseNumber: String,
  status: {
    type: String,
    enum: ["OnDuty", "OffDuty", "OnTrip"],
    default: "OnDuty"
  }
});

module.exports = mongoose.model("Driver", driverSchema);