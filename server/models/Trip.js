const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  cargoWeight: {
    type: Number,
    required: true,
  },
  origin: String,
  destination: String,
  status: {
    type: String,
    enum: ["Draft", "Dispatched", "Completed", "Cancelled"],
    default: "Dispatched",
  },
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;