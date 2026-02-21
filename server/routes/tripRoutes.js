const express = require("express");
const router = express.Router();

const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const protect = require("../middleware/authMiddleware");
console.log("Trip Model:", Trip);
router.post("/", async (req, res) => {
  try {
    const { vehicleId, driverId, cargoWeight, origin, destination } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    const driver = await Driver.findById(driverId);

    if (!vehicle || !driver) {
      return res.status(404).json({ error: "Vehicle or Driver not found" });
    }

    // Check vehicle availability
    if (vehicle.status !== "Available") {
      return res.status(400).json({ error: "Vehicle not available" });
    }

    // Check driver availability
    if (driver.status !== "OnDuty") {
      return res.status(400).json({ error: "Driver not available" });
    }

    // Check cargo capacity
    if (cargoWeight > vehicle.maxLoad) {
      return res.status(400).json({ error: "Cargo exceeds vehicle capacity" });
    }

    // Create trip
    const trip = await Trip.create({
      vehicleId,
      driverId,
      cargoWeight,
      origin,
      destination,
    });

    // Update statuses
    vehicle.status = "OnTrip";
    driver.status = "OnTrip";

    await vehicle.save();
    await driver.save();

    res.status(201).json(trip);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("vehicleId")
      .populate("driverId");

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:id/complete", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    trip.status = "Completed";
    await trip.save();

    const vehicle = await Vehicle.findById(trip.vehicleId);
    const driver = await Driver.findById(trip.driverId);

    vehicle.status = "Available";
    driver.status = "OnDuty";

    await vehicle.save();
    await driver.save();

    res.json({ message: "Trip completed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;