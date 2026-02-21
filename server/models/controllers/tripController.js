const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

exports.createTrip = async (req, res) => {
  try {
    const { vehicleId, driverId } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    const driver = await Driver.findById(driverId);

    if (!vehicle || !driver) {
      return res.status(404).json({ error: "Vehicle or Driver not found" });
    }

    const trip = new Trip(req.body);
    await trip.save();

    vehicle.status = "OnTrip";
    driver.status = "OnTrip";
    await vehicle.save();
    await driver.save();

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};