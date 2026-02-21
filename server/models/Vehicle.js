const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  maxLoad: {
    type: Number,
    required: true,
  },
  odometer: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Available", "OnTrip", "InShop", "Retired"],
    default: "Available",
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);